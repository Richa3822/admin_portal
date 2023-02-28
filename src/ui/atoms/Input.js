import React from 'react'

export default function Input({ label, forHtml, type, placeholder, id, name, defaultValue, onChange, onBlur }) {
    return (
        <div className="form-group">
            <label htmlFor={forHtml}>{label}</label>
            <input type={type} className="form-control"
                placeholder={placeholder}
                id={id} name={name}
                defaultValue={defaultValue}
                onChange={onChange}
                onBlur={onBlur} />
        </div>
    )
}
