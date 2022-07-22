import { isEmpty } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { createToast } from './createToast'
import InputComponent from './InputComponent'

const TestStore = (props) => {
  return (
    <form className="form-search-top" onSubmit={props.handleSubmit}>
      <div className="select-field">
        <label>Tên Level:</label>
        <Field
          className="col-md-12 p-0"
          name="name"
          placeholder="Nhập tên skill"
          component={InputComponent}
        />
        <label>Thứ tự</label>
        <Field
          className="col-md-12 p-0"
          name="order"
          placeholder="Nhập thứ tự"
          component={InputComponent}
          disabled={true}
        />
        <label>Thứ tự mới</label>
        <Field
          className="col-md-12 p-0"
          name="order_new"
          placeholder="Nhập thứ tự mới"
          component={InputComponent}
        />
        <button className="btn btn-success f-right" type="submit">
          Edit
        </button>
      </div>
    </form>
  )
}

const handleSubmit = async (values, props) => {
  console.log(values)

  values.order_old = values.order
  values.job_skill_id = props.skillId
  let errors = {}
  if (
    (values.order_new !== undefined &&
      values.order_new &&
      isNaN(values.order_new)) ||
    values.order_new < 0
  ) {
    errors = {
      ...errors,
      ...{ order_new: 'Trường này chỉ nhận số nguyên dương' },
    }
  }
  if (!isEmpty(errors)) {
    const message: string[] = Object.values(errors)
    createToast({ type: 'error', message })
    throw new SubmissionError(errors)
  }
}

// export default TestStore
export default reduxForm({
  form: 'syncValidation',
  enableReinitialize: true,
  onSubmit: handleSubmit,
})(TestStore)
