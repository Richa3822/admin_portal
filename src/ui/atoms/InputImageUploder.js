import React from 'react'

export default function InputImageUploder({ label, forHtml, type, id, name, defaultValue, onChange, onBlur }) {
    return (
        <div className="form-group">
            <label htmlFor={forHtml}>{label}</label><br />
            <input
                type={type}
                id={id} name={name}
                defaultValue={defaultValue}
                onChange={onChange}
                onBlur={onBlur} />
        </div>
    )
}
