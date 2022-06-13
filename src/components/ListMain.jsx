import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListView from './ListView';

//Main list view
class ListMain extends Component {
    constructor(){
        super();

        this.state = {
            data : [],
            cat : [],
            sel : "",
            page : 0
        }
    }

    //To load listing when page loaded
    componentDidMount(){
        fetch("/api/cat")
        .then((res) => res.json())
        .then((rel) => this.setState({cat : rel}));

        fetch("/api/posts",
        {
            method : "POST",
            body: JSON.stringify({currentPage: this.state.page})
        })
        .then((res) => res.json())
        .then((rel) => {
            this.setState({data : rel.posts});
            this.setState({page : this.state.page+1});
        });
    }

    render(){
        //For load more and search use
        const loadMore = () => {
            fetch("/api/posts",
            {
                method : "POST",
                body: JSON.stringify({cat: this.state.sel, currentPage: this.state.page})
            })
            .then((res) => res.json())
            .then((rel) => {
                console.log(rel);
                if (rel.posts.length === 0){
                    alert("End of page");
                }
                else{
                    this.setState({data : this.state.data.concat(rel.posts)});
                    this.setState({page : this.state.page+1});
                }   
            });  
        }
        const search = ()=>{
            //Rest all state varaible for search
            this.setState({ data : []});
            this.setState({ page : 0}, 
                () => {
                loadMore();
            });
        }

        const dpOnChange= (e) =>{
            //update dropdown current selected value
            this.setState({ sel : e.target.value});
        }

        return(
            <Container style={{border: "1px solid #000", borderRadius: "3px", minHeight: "200px", marginTop: ".5rem", marginBottom: ".5rem"}}>
                <Row style={{margin: "10px 5px "}}>
                    <Col md={10}>
                    <select className="form-control" style={{marginBottom: "10px"}} value={this.state.sel} onChange={dpOnChange}>
                        {
                            this.state.cat.map((data)=>{
                                return <option key={data}>{data}</option>
                            })
                        }
                    </select>
                    </Col>
                    <Col md={2}>
                    <button className="form-control btn-primary" onClick={search}>Search</button>
                    </Col>
                    <hr />
                </Row>
                <Row style={{margin: "10px 5px "}}>
                    {
                        this.state.data.map(data =>{
                            return <ListView rowData={data} key={data.id}></ListView>
                        })
                    }
                </Row>
                <Row>
                    <Col>
                        <div className="d-grid gap-2" style={{marginBottom: "5px"}}>
                            <button className="btn-primary" onClick={loadMore}>Load More</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
    
}

export default ListMain;