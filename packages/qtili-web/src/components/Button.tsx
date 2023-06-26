import React from 'react'
import styled from '@emotion/styled'

export const Button = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: transparent;
  color: ${(props) => props.theme.palette.text.primary}
  cursor: pointer;
  transition: border-color 0.25s;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`
