export type ActionType = {
    type: "sum" | "mult" | "sub" | "div" | "exp"
    number: number
}

// export const calculator = (state: number, action: ActionType) => {
//     switch (action.type) {
//         case "sum":
//             return state + action.number
//         case "mult":
//             return state * action.number
//         case "sub":
//             return state - action.number
//         case "div":
//             return state / action.number
//         case "exp":
//             return state ** action.number
//         default:
//             return state
//     }
// }