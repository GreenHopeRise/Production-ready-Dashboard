import { permissions } from "./permissions"

export const can=(role, action)=>{
    return permissions?.[role]?.[action] || false
}