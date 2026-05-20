export const permission = {
    admin:{
        users:true,
        productCreat: true,
        productUpdate: true,
        productDelete: true
    },
    user:{
        users:false,
        productCreat: false,
        productUpdate: false,
        productDelete: false
    },
    editor:{
        users:false,
        productCreat: true,
        productUpdate: true,
        productDelete: false
    },
}
export const can=(role, action)=>{
    return permission?.[role]?.[action] || false
}