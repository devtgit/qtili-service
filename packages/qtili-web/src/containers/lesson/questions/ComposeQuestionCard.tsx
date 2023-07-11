import "./ComposeQuestionCard.css";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragOverlay,
  UniqueIdentifier,
  DragEndEvent,
  DragStartEvent,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  DragMoveEvent,
  DragOverEvent,
  Data,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { SortableContext, SortableData, useSortable } from "@dnd-kit/sortable";
import { enableMapSet } from "immer";
import { CSS } from "@dnd-kit/utilities";
import { useAtomValue } from "jotai";
import Typography from "@mui/material/Typography";
import { ComposeQuestion, ComposeType } from "@/db/questions/ComposeQuestion";
import { State } from "@/store/State";
import { Actions } from "@/store/Actions";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { playWordSound } from "@/utils/audio";

enableMapSet();

export const ComposeQuestionCard = (props: { question: ComposeQuestion }) => {
  const { question } = props;

  const { t } = useTranslation();

  return (
    <div>
      <h3>{t("translate_phrase")}</h3>
      <div>{question.phrase}</div>
      <ComposeAnswer question={question} />
    </div>
  );
};

function disableSortingStrategy() {
  /*
    it's really hard to create strategy for multirows variable size items
    instead of sorting items in strategy, move them inside items array onDragOver
    // that's why this function returns null
    see https://github.com/clauderic/dnd-kit/issues/44#issuecomment-757312037
    see https://codesandbox.io/s/test-dnd-kit-forked-rhsq9?file=/src/App.js
  */
  return null;
}

const isSortable = (data: Data | undefined): data is SortableData =>
  data ? "sortable" in data : false;

function ComposeAnswer(props: { question: ComposeQuestion }) {
  const { question } = props;
  const questionId = question.id;
  const answer = useAtomValue(State.answerAtomFamily(questionId));
  const setAnswer = Actions.useSetAnswer();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const activeItem = useMemo(
    () => activeId && question.words[activeId],
    [activeId]
  );
  const itemWasMovedRef = useRef(false);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    itemWasMovedRef.current = false;

    const activeId = active.id;
    setActiveId(activeId);

    Promise.resolve().then(async () => {
      playWordSound(question.words[activeId].wd);
    });
  };

  const handleDragMove = (_: DragMoveEvent) => {
    itemWasMovedRef.current = true;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const activeId = active.id as string;

    if (over != null) {
      if (!isSortable(active.data.current) && isSortable(over.data.current)) {
        setAnswer(questionId, {
          questionType: ComposeType,
          type: "MOVE_TO_RESULT",
          activeId: activeId,
        });
        return;
      }

      if (isSortable(active.data.current) && isSortable(over.data.current)) {
        setAnswer(questionId, {
          questionType: ComposeType,
          type: "REORDER_ITEMS",
          activeIndex: active.data.current.sortable.index,
          overIndex: over.data.current.sortable.index,
        });
        return;
      }
    }
  };

  // event.over is null when user taps too fast
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeId = active.id as string;

    const itemWasMoved = itemWasMovedRef.current;

    itemWasMovedRef.current = false;
    setActiveId(null);

    if (
      !isSortable(active.data.current) &&
      (over == null ||
        !itemWasMoved ||
        (!isSortable(over.data.current) && over.id === "result-droppable"))
    ) {
      setAnswer(questionId, {
        questionType: ComposeType,
        type: "MOVE_TO_RESULT",
        activeId: activeId,
      });
      return;
    }

    if (
      isSortable(active.data.current) &&
      (over == null ||
        !itemWasMoved ||
        (!isSortable(over.data.current) && over.id !== "result-droppable"))
    ) {
      setAnswer(questionId, {
        questionType: ComposeType,
        type: "MOVE_TO_CHOICE",
        activeIndex: active.data.current.sortable.index,
      });
      return;
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  if (answer.type === ComposeType) {
    return (
      <div className="App">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <ResultArea>
            <SortableContext
              strategy={disableSortingStrategy}
              items={answer.result}
            >
              {answer.result.map((id) => {
                return <ResultSortable key={id} item={question.words[id]} />;
              })}
            </SortableContext>
          </ResultArea>

          <ChoicesAreaDroppable>
            {question.initialWordsOrdering.map((id) => {
              return (
                <ChoiceWrapper key={id}>
                  {answer.result.indexOf(id) != -1 ? (
                    renderItemContent({
                      item: question.words[id],
                      hidden: true,
                    })
                  ) : (
                    <ChoiceDraggable item={question.words[id]} />
                  )}
                </ChoiceWrapper>
              );
            })}
          </ChoicesAreaDroppable>

          {createPortal(
            <DragOverlay adjustScale={false}>
              {activeItem && renderItemContent({ item: activeItem })}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    );
  }

  return null;
}

// Components

export type Item = {
  id: string;
  wd: string;
};

export const renderItemContent = (props: { item: Item; hidden?: boolean }) => {
  return <ItemContent {...props} />;
};

const ItemContent = ({
  item,
  hidden = false,
}: {
  item: Item;
  hidden?: boolean;
}) => {
  const theme = useTheme();
  const style = {
    opacity: hidden ? 0 : 1,
  };

  return (
    <div
      style={style}
      className={css`
        padding: 5px 10px;
        border-radius: 6px;
        border: 2px solid ${theme.border.main};
        cursor: pointer;
        display: flex;
        flex-direction: column;
        background-color: ${theme.palette.background.paper};
        color: ${theme.palette.text.primary};
        -webkit-tap-highlight-color: transparent;

        &:disabled {
          cursor: default;
        }
      `}
    >
      <Typography>{item.wd}</Typography>
    </div>
  );
};

export const ResultArea = ({ children }: { children: React.ReactNode }) => {
  const droppable = useDroppable({
    id: "result-droppable",
  });

  return (
    <div ref={droppable.setNodeRef} className="resultArea">
      {children}
    </div>
  );
};

export const ResultSortable = ({ item }: { item: Item }) => {
  const sortable = useSortable({ id: item.id });

  const style = {
    transition: sortable.transition,
    transform: CSS.Translate.toString(sortable.transform),
    opacity: sortable.isDragging ? 0 : 1,
  } as React.CSSProperties;

  return (
    <div
      {...sortable.attributes}
      ref={sortable.setNodeRef}
      {...sortable.listeners}
      style={style}
      className="resultSortable"
    >
      {renderItemContent({ item })}
    </div>
  );
};

export const ChoicesAreaDroppable = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setNodeRef } = useDroppable({
    id: "choices-droppable",
  });

  return (
    <div ref={setNodeRef} className="choicesArea">
      {children}
    </div>
  );
};

export const ChoiceWrapper = ({ children }: { children: React.ReactNode }) => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setWidth(ref.current!.getBoundingClientRect().width ?? undefined);
  }, []);

  const style = {
    width: width,
  };

  return (
    <div ref={ref} style={style} className="choiceDroppable">
      {children}
    </div>
  );
};

export const ChoiceDraggable = ({ item }: { item: Item }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: item.id,
    });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {renderItemContent({ item })}
    </div>
  );
};
