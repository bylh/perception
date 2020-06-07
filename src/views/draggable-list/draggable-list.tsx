import React from 'react';
import './draggable-list.scss'
import useDraggable from './useDraggable';
function cls(def, ...conditions) {
    const list = [def]
    conditions.forEach(cond => {
        if (cond[0]) {
            list.push(cond[1])
        }
    })
    return list.join(' ')
}
function Draggable({children, eventHandlers, dragging, id}) {
    // console.log('可拖转', eventHandlers);
    return <div draggable={true} {...eventHandlers} className={cls("draggable", [dragging === id, "dragging"])}>
        {children}
    </div>
}
function Bar({id, dragging, dragOver, eventHandlers}) {
    if (id === dragging + 1) {
        return null
    }
    return <div {...eventHandlers} className={cls("draggable--bar", [dragOver === id, "dragover"])}>
        <div className="inner" style={{
            height: id === dragOver ? '80px' : '0'
        }}/>
    </div>
}
function Card({src, title}) {
    return (<div className="card">
        <img src={src} alt={'img'}/>
        <span>{title}</span>
    </div>)
}
export default function DraggableList({list}) {
    const {dragList, createDraggerProps, createDropperProps} = useDraggable(list)

    return (dragList as any).map((item, i) => {
        if (item.type === "BAR") {
            // return <div onDragOver={dragOverTest} key={item.id}>哈哈哈</div>
            return <Bar id={i} {...createDropperProps(i)} key={item.id}/>
        } else {
            // console.log('item id', i, createDraggerProps(i, item.id));
            return (<Draggable {...createDraggerProps(i, item.id)}>
            <Card {...item.data}/>
        </Draggable>)
        }
    })
}
