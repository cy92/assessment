import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Category from './Category';

// List view components
const ListView = ({rowData}) =>{
    const box = {
        border : "2px solid #000",
        borderRadius : "5px",
        padding : "10px 5px",
        margin : "5px 0"
    }
    return (
        <Col lg={6} xs={12} md={12}>
            <div style={box}>
                <h4 style={{textAlign: "center", textDecoration : "underline", marginBottom: "15px"}}> {rowData.title} </h4>
                <Row>
                    <Col md={4} style={{textAlign: "center"}}>
                        <img alt="" height="90" src={rowData.author.avatar}></img>
                        <h6 style={{textAlign: "center", marginBottom: "5px"}}>{rowData.author.name}</h6>
                        <small style={{textAlign: "left"}}>{rowData.publishDate}</small>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={12} style={{marginBottom: "5px"}}>
                            <textarea className="form-control" rows="4" disabled style={{resize: "none"}} value={rowData.summary}></textarea>
                            </Col>
                            <Col md={12}>
                                {rowData.categories.map(cat =>{
                                    return (<Category key={cat.id} cat={cat}/>)
                                })}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

export default ListView;