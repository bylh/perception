import {useState} from 'react';
const DRAGGABLE = 'DRAGGABLE';
const BAR = 'BAR'
function draggable(item, id) {
    return {
        type: DRAGGABLE,
        id,
        data: item
    }
}

function insertBars(list) {
    let i = 0;
    const newBar = () => {
        return {
            type: BAR,
            id: i++
        }
    }
    return [newBar()].concat(
        ...list.map(item => [draggable(item, i++), newBar()])
    )
}
function clacChanging(list, drag, drop) {
    // console.log('clacChanging', list, drag, drop);
    list = list.slice()
    const dragItem = list[drag];
    const dir = drag > drop ? -2 : 2
    // drop的地方是bar
    const end = dir > 0 ? drop - 1 : drop + 1
    for (let i = drag; i !== end; i += dir) {
        list[i] = list[i + dir]
    }
    list[end] = dragItem;
    return list;
}
export default function useDraggable(list) {
    const [dragList, setDragList] = useState(() => {
        return insertBars(list)
    })
    const [dragOver, setDragOver] = useState(null)
    const [dragging, setDragging] = useState(null)
    return {
        dragList,
        createDropperProps: id => {
            return {
                dragging,
                dragOver,
                eventHandlers: {
                    onDragOver: e => {
                        console.log('bar onDragOver', e);
                        e.preventDefault()
                        setDragOver(id)
                    },
                    onDragLeave: e => {
                        console.log('bar onDragLeave', e);
                        e.preventDefault()
                        setDragOver(null)

                    },
                    onDrop: e => {
                        console.log('onDrop', e);
                        e.preventDefault()
                        setDragOver(null)
                        setDragList(list => {
                            return clacChanging(list, dragging, id)
                        })
                    }
                }
            }
        },
        createDraggerProps: (id, key) => {
            return {
                id,
                key: id,
                dragging,
                eventHandlers: {
                    onDragStart: () => {
                        // console.log('onDragStart', id, dragging);
                        setDragging(id)
                    },
                    onDragEnd: () => {
                        // console.log('onDragEnd', id, dragging);
                        setDragging(null)
                    }
                }
            }
        }
    }
}
