import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
    },
]

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

/**
 * 注意这个是如何将action creator和reducer结合起来的.
 * 对于action其实有两个
 * type
 * payload
 * type就是name/reducer的名字
 * payload就是reducer的参数
 * 还有就是reducer里可以使用mutable对象了 (框架会帮你保证不变性)
 * 使用mutable对象的好处就是代码可能会更简单.(相比复制来说)
 * 
 * 其实就是更方便的定义action createor和reducer.
 */
const noteSlice = createSlice({
    name: 'notes', //给个名字, 用来
    initialState, // 
    reducers: {        
        createNote(state, action) {
            const content = action.payload
            state.push({
                content,
                important: false,
                id: generateId(),
            })
        },
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        }
    },
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer