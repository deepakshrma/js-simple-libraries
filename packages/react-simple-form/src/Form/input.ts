import * as React from 'react';
interface MetaData {
    valid: boolean;
    dirty: boolean;
    touched: boolean;
}
type InputValidator =  (val: string) => boolean
export const useInputField = ({validator = (val: string) => true }: { validator: InputValidator}) => {
    const [value, setValue] = React.useState('');
    const [meta, setMeta] = React.useState({
        valid: true,
        dirty: false,
        touched: false
    } as MetaData);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedMeta = {
            dirty: true,
            touched: true,
            valid: true
        } as MetaData
        updatedMeta.valid = validator(event.target.value)
        setMeta(updatedMeta)
        setValue(event.target.value)
    }
    const onBlur = (event: React.FormEvent<HTMLInputElement>) => {
        let updatedMeta = {
            ...meta,
            dirty: true,
            touched: true
        } as MetaData
        setMeta(updatedMeta)
    }
    const onFocus = (event: React.FormEvent<HTMLInputElement>) => {
        let updatedMeta = {
            ...meta,
            touched: true
        } as MetaData
        setMeta(updatedMeta)
    }
    return [{input: {value, onChange, onBlur, onFocus}, meta: {...meta}}, onChange];
}