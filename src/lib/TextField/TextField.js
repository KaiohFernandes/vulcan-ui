//TODO: Fix the assistive text changing fast between error and helper when it has an required error

import _isEqual from 'lodash.isequal'
import React, { useEffect, useRef, useState } from 'react'
import { classNames, useDeepCompareEffect } from '../index'
import Autocomplete from './Autocomplete/Autocomplete'
import Autosize from './Autosize/Autosize'
import Number from './Number/Number'
import './TextField.scss'
import useValidation from './useValidation'

function checkIfIsCounter(value) {
    return new RegExp('^[0-9]+\\/[0-9]+$').test(value)
}

const TextField = ({
                       className,
                       inputClassName,
                       id,
                       name,
                       label,
                       onChange,
                       type,
                       value: defaultValue,
                       helperText,
                       validation,
                       required,
                       format,
                       onFocus,
                       onBlur,
                       children,
                       autoComplete,
                       setRef,
                       suffix,
                       readOnly,
                       disabled,
                       hidden,
                       autosize,
                       inputElement,
                       ...props
                   }) => {
    const ref = useRef(null)
    type = type || 'text'
    format = format || { parse: f => f, mask: f => f }
    id = id || name
    setRef = setRef || ref
    if (!validation && required) {
        validation = validation || {
            required
        }
    }
    if (!required && validation) {
        required = validation.required
    }
    const [value, setValue] = useState(defaultValue)
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(!!defaultValue)
    const [isPristine, setIsPristine] = useState(!defaultValue)
    const [hasError, errorMessage, setCustomErrorMessage] = useValidation(value, validation)

    className = classNames(
        className,
        'vui-TextField',
        'vui-Field',
        isFocused && 'is-focused',
        isFilled && 'is-filled',
        isPristine && 'is-pristine',
        hasError && 'has-error',
        suffix && 'has-suffix',
        readOnly && 'is-readonly',
        disabled && 'is-disabled',
        hidden && 'is-hidden'
    )

    const handleChange = ({ target }) => {
        const newValue = format.parse(target.value)

        setValue(newValue)
        setIsPristine(false)
        setIsFilled(!!newValue)
        onChange && onChange(newValue)
    }

    useDeepCompareEffect(() => {
        if (!_isEqual(value, defaultValue)) {
            const newValue = defaultValue

            setIsPristine(false)
            setValue(format.parse(newValue))
            setIsFilled(!!newValue)
        }
    }, [defaultValue])

    const handleAnimationStart = (e) => {
        switch (e.animationName) {
            case 'onAutoFillStart':
                setIsFilled(true)
                break
            case 'onAutoFillCancel':
                setIsFilled(!!value)
                break
            default:
        }
    }

    const handleCustomErrorMessage = (errorMessage) => {
        setIsPristine(false)
        setCustomErrorMessage(errorMessage)
    }

    useEffect(() => {
        const refContent = {
            element: ref.current,
            setCustomErrorMessage: handleCustomErrorMessage
        }

        if (setRef) {
            if (typeof setRef !== 'function') {
                setRef.current = refContent
            } else {
                setRef({ current: refContent })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCustomErrorMessage])

    const inputElementProps = {
        ref: ref,
        className: classNames('input', inputClassName),
        id: id,
        name: name,
        type: type,
        onChange: handleChange,
        value: format.mask(value) || '',
        onFocus: e => {
            setIsFocused(true)
            if (onFocus) onFocus(e)
        },
        onBlur: e => {
            setIsFocused(false)
            if (onBlur) onBlur(e)
        },
        required: required,
        autoComplete: autoComplete === false ? 'off' : undefined,
        readOnly: readOnly,
        disabled: disabled,
        onAnimationStart: handleAnimationStart,
        ...props
    }

    return (
        <div className={className}>
            <div className='input-container'>
                {
                    inputElement
                        ? inputElement(inputElementProps)
                        : <input {...inputElementProps} />
                }
                {suffix &&
                <div className='suffix'>{suffix}</div>
                }
                {!!label &&
                <label htmlFor={id}>
                    {label}
                </label>
                }
                <div className='border' />
            </div>
            {(hasError || helperText) &&
            <div className={classNames(
                'assistive-text',
                (hasError && checkIfIsCounter(errorMessage)) && 'counter')
            }>
                {(!isPristine && hasError) ? errorMessage : helperText}
            </div>
            }
            {children}
        </div>
    )
}

TextField.Number = Number

TextField.Autocomplete = Autocomplete

TextField.Autosize = Autosize

export default TextField
