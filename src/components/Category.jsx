const Category = ({cat}) =>{
    const badge = {
        backgroundColor : "grey",
        color : "#FFF",
        marginRight: "3px",
        padding: "0 8px",
        borderRadius : "5px"
    }
    return (
       <span style={badge}>{cat.name}</span>
    )
}

export default Category;