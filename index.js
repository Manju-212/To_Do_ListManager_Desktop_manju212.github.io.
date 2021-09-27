let current_card;
let check_delete = 0;
var card_count = 0;
var Todo_Cards = [];
let Redirect_check;
var b = document.querySelector(".blur");
var pop_list = document.querySelector(".card-container-2");
var pop_item = document.querySelector(".card-container-3");
var redirect_crad = document.querySelector(".card-click");
function addlist() {
   pop_list.style.visibility = "visible";
   pop_item.style.visibility = "hidden";
   b.style.filter = "blur(7px)";
}
function setcard_first()
{
   var heading = document.querySelector("#list-header").value;
   if (heading !== " ") {
      const Todo = {
         heading,
         Sub_List: [],
         checked: false,
         id: Date.now(),
      };
      Todo_Cards.push(Todo);
   }
   heading = " ";
   setcard_last();
}
function setcard_last() 
{
   const main = document.querySelector(".card-container");
   var child  = main.lastElementChild;
   while(child)
   {
      main.removeChild(child);
      child = main.lastElementChild;
   }
   var content;
   for (let i = 0; i < Todo_Cards.length; i++) {
    
      const card = document.createElement('div');
      card.setAttribute("class", "card");
      card.setAttribute("id",Todo_Cards[i].id);
      card.innerHTML =  `
      <div class="card-header" onclick="Redirect(this)">
          <h4>${Todo_Cards[i].heading}</h4>
          <hr>
      </div>
      <div class="card-content">
          <ul>
          </ul>
      </div>
      <div class="card-footer">
      <i class="fa fa-trash" aria-hidden="true" class="Mark_Done" style="color:blue;"  onclick="Delete_Card(this)"></i>
      &ThinSpace;
         <i class="fas fa-plus-circle fa-lg header-add-icon" style="color: red;" onclick="addItem(this)"></i>
      </div>
        `;
      main.appendChild(card);
      let current_todo = Todo_Cards[i];
      for(let j = 0 ;j<current_todo.Sub_List.length;j++)
      {
         let add_list = document.createElement("li");
         console.log(current_todo.Sub_List[i].marked);
         add_list.setAttribute("id",current_todo.Sub_List[j].id);
         var present_id = current_card.parentElement.parentElement.getAttribute("id");
         add_list.innerHTML = `${current_todo.Sub_List[j].name}&ThinSpace;<i class="fa fa-trash" aria-hidden="true" class="Mark_Done" style="color:blue;"  onclick="MarkCompleted(this)"></i>`;
         card.children[1].children[0].appendChild(add_list);
      }
   }
   pop_list.style.visibility = "hidden";
   b.style.filter = "blur(0px)";
}
function addItem(id) 
{
      pop_list.style.visibility = "hidden";
      pop_item.style.visibility = "visible";
      b.style.filter = "blur(7px)";
      current_card = id;
}
function addItem_Content() 
{
   pop_item.style.visibility = "hidden";
   b.style.filter = "blur(0px)";
   redirect_crad.style = "blur(0px)";
   var j = document.querySelector("#list-item").value;
   var child_node = current_card.parentElement.parentElement.children[1].children[0];
   var list = document.createElement("li");
   list.setAttribute("class","list_item");
   list.setAttribute("id",Date.now());
   list.innerHTML = `${j}&ThinSpace;<i class="fa fa-trash" aria-hidden="true" class="Mark_Done" onclick="MarkCompleted(this)" style="color:blue;"></i> `;
   var present_id = current_card.parentElement.parentElement.getAttribute("id");
   for(let i = 0;i<Todo_Cards.length;i++)
   {
      if(present_id  == Todo_Cards[i].id)
      {
         const l = {
            name : j,
            marked : false,
            id : list.getAttribute("id"),
         };
         Todo_Cards[i].Sub_List.push(l);
      }
   }
   child_node.appendChild(list);
   j = " ";
}
function MarkCompleted(Mark_this)
{
    var r = Mark_this.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
    let s;
    console.log(Todo_Cards);
    for(let i = 0;i<Todo_Cards.length;i++)
    {
       if(Todo_Cards[i].id == r)
       {
          for(let j = 0;j<Todo_Cards[i].Sub_List.length;j++)
          {
             if(Todo_Cards[i].Sub_List[j].id == Mark_this.parentElement.getAttribute("id"))
             {
               console.log(Todo_Cards[i].Sub_List[j].id,Mark_this.parentElement.getAttribute("id"));
               Todo_Cards[i].Sub_List.splice(j,1);
               s = i ;
               break;
             }
          }
       }
    }
    if(b.style.display == "none")
    {
       Redirect_Render(s);
    }
    else{
      console.log(Todo_Cards);
      setcard_last();
    }
    
}
function Delete_Card(Delete)
{
   var D = Delete.parentElement.parentElement.getAttribute("id");
   console.log(D);
   for(let i = 0;i<Todo_Cards.length;i++)
   {
       if(D == Todo_Cards[i].id)
       {
          Todo_Cards.splice(i,1);
       }
   }
   setcard_last();
}
function Redirect(current_card_redirect)
{
   b.style.display = "none";
   for(let k = 0;k<Todo_Cards.length;k++)
   {
      if(current_card_redirect.parentElement.getAttribute("id") == Todo_Cards[k].id)
      {
         Redirect_Render(k);
         break;
      }
   }
}
function Redirect_Render(k)
{
   redirect_crad.style.display = "block";
   const main = document.querySelector(".card-click");
   var child  = main.lastElementChild;
   while(child)
   {
      main.removeChild(child);
      child = main.lastElementChild;
   }
   const card = document.createElement('div');
   card.setAttribute("class", "card-1");
   card.setAttribute("id",Todo_Cards[k].id);
   let inner =  `
   <div class="head-container-2">
   <h1>${Todo_Cards[k].heading}</h1>
    </div>
    <div class="back-container">
  <i class="fas fa-arrow-circle-left" onclick = "Go_Back(this.id)" id = ${k}><span style="font-family: 'IBM Plex Sans Arabic', sans-serif;" >Back</span></i>
    </div>
    <div class="class-container-4">
    </div>
    `;
   card.innerHTML =  `
    <div class="card-header" onclick="Redirect(this)">
        <h4>${Todo_Cards[k].heading}</h4>
        <hr>
    </div>
    <div class="card-content">
        <ul>
        </ul>
    </div>
    <div class="card-footer">
    <i class="fa fa-trash" aria-hidden="true" class="Mark_Done" style="color:blue;"  onclick="Delete_Card_Redirect(this)"></i>
    &ThinSpace;
       <i class="fas fa-plus-circle fa-lg header-add-icon" style="color: red;" onclick="addItem_Redirect(this)"></i>
    </div>
      `;
   document.querySelector(".card-click").innerHTML = inner;
   document.querySelector(".class-container-4").appendChild(card);
   let current_todo = Todo_Cards[k];
   for(let j = 0 ;j<current_todo.Sub_List.length;j++)
   {
      let add_list = document.createElement("li");
      add_list.setAttribute("id",current_todo.Sub_List[j].id);
      var present_id = current_card.parentElement.parentElement.getAttribute("id");
      add_list.innerHTML = `${current_todo.Sub_List[j].name}&ThinSpace;<i class="fa fa-trash" aria-hidden="true" class="Mark_Done" style="color:blue;"  onclick="MarkCompleted(this)"></i>`;
      card.children[1].children[0].appendChild(add_list);
      console.log(add_list);
   }
}
function addItem_Redirect(card_object)
{
   redirect_crad.style.filter = "blur(7px)";
   addItem(card_object);
}
function Go_Back(card_no)
{
   b.style.display = "block";
   console.log("came to back ");
   redirect_crad.style.display = "none";
   setcard_last();
}
function Delete_Card_Redirect(card_object)
{
   b.style.display = "block";
   redirect_crad.style.display = "none";
   Delete_Card(card_object);
}