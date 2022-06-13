import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    //For filtering and load more use
    this.post('/posts', (schema, request) => {
      let json = JSON.parse(request.requestBody);
      let tempresult = {};
      if (json.cat && json.cat.trim() !== ""){
        tempresult.posts = data.posts.filter(function(obj) {
          return obj.categories.some(function(item){
            return item.name.indexOf(json.cat) >= 0;
          });
        });
        
      }
      else{
        tempresult = data;
      }
      let fetchsize = 4;
      let current = json.currentPage*fetchsize;
      let res = {}
      res.posts = tempresult.posts.slice(current, current+fetchsize);
      return res;
    });

    //Retrieve category list
    this.get('/cat',()=>{
      let catobj = [""];
      data.posts.map((data) =>{
        let temp = [];
        data.categories.map((data)=>{
          temp.push(data.name);
          return true;
       });
        catobj = [...new Set( catobj.concat(temp))];
        return true;
      });
      return catobj;
    });
  },
});
