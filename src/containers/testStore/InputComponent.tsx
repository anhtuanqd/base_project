import React from 'react'
import { Form, Row, Col, InputGroup } from 'react-bootstrap'

interface Props {
  error?: string
  placeholder?: string
  readOnly: boolean
  name: string
  label: string
  value: string
  type: string
  as: string
  required?: boolean
  id?: string
  input: any
  disabled: boolean
  autoFocus?: boolean
  rows?: number
  inputCls?: string
  labelCls?: string
  className?: string
  prepend?: string
}

const InputComponent: any = (props) => {
  const {
    id,
    input,
    width,
    meta,
    disabled = false,
    required = false,
    inputType = 'text',
    placeholder = '',
    readOnly = false,
    inputCls = '',
    label = '',
    labelCls = '',
    className = '',
    prepend = '',
    as = 'input',
    rows = 3,
    inline = false,
    autoFocus = false,
  } = props
  const error = meta?.error ? true : false

  return (
    <Form.Group as={inline ? Row : 'div'} className={className}>
      {label && (
        <Form.Label className={labelCls}>
          {label} {required ? <span className="text-danger"> *</span> : null}
        </Form.Label>
      )}
      <InputGroup className={inputCls}>
        {prepend ? (
          <InputGroup>
            <InputGroup.Text id="inputGroupPrepend">{prepend}</InputGroup.Text>
          </InputGroup>
        ) : null}
        <Form.Control
          type={inputType}
          as={as}
          {...input}
          onChange={(value) => {
            input.onChange(value)
          }}
          id={id}
          required={required}
          width={width}
          label={label}
          isInvalid={error}
          placeholder={placeholder}
          readOnly={readOnly}
          autoFocus={autoFocus}
          rows={rows}
          disabled={disabled}
        />
      </InputGroup>
    </Form.Group>
  )
}

export default InputComponent
