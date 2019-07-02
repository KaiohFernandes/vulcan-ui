import React, { useEffect } from 'react'
import { List, Icon } from '../lib'
import useTitle from './useTitle'

const ButtonDemo = () => {
    const [, setTitle] = useTitle()
    useEffect(() => setTitle('Button'))

    return (
        <>
            <h1>Button</h1>
            <>
                <h2>Contained</h2>
                <div>
                    <Button onClick={() => alert('Contained button clicked')}>
                        Contained button
                    </Button>
                </div>
                <pre>{`<Button onClick={() => alert('Contained button clicked')}>
                            Contained button
                        </Button>`}
                </pre>
            </>
        </>
    )
}

export default ButtonDemo
