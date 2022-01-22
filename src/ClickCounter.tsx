import * as React from 'react';

type Props = {};

export default function ClickCounter() {
    const [count, setCount] = React.useState(0);

    return (
        <div>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>Counter {count}</button>
        </div>
    );
}
