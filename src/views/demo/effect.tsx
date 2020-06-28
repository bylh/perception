import React, { useState, useEffect } from 'react';

export function Effect() {
    const [count, setCount] = useState(0);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    }); // 后面跟参数[]不会刷新，只会在首次render后更新，否则只要依赖数组更新都会执行

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}