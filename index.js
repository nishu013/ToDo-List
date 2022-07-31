showtask();
let addinput=document.getElementById("addinput");
let addtaskbtn=document.getElementById("addtaskbtn");
addtaskbtn.addEventListener("click",()=>
{
    addtaskinputval=addinput.value;
    let webtask = localStorage.getItem("localtask");
    if(addtaskinputval.trim()!=0)
    {

        if(webtask == null)
        {
            taskobj=[];
        }
        else
        {
            taskobj=JSON.parse(webtask);
        }
        taskobj.push(addtaskinputval);
        localStorage.setItem("localtask",JSON.stringify(taskobj));
        addinput.value='';
    }
    showtask();
})

function showtask()
{
    let webtask = localStorage.getItem("localtask");
    if(webtask == null)
    {
        taskobj=[];
    }
    else
    {
        taskobj=JSON.parse(webtask);
    }
    let html='';
    let addtasklist=document.getElementById("addtasklist");
    taskobj.forEach((item,index) => {
    html +=`  <tr>
    <th scope="row">${index+1}</th>
    <td>${item}</td>
    <td><button type="button" onclick="edittask(${index})" class="text-muted rounded-circle border border-dark" ><i class="fa fa-edit"></i></button></td>
    <td><button type="button" class="text-danger rounded-circle border border-dark" onclick="deletetask(${index})"><i class="fa fa-trash"></i></button></td>
  </tr>`        
    });
    addtasklist.innerHTML= html;
}



function edittask(index)
{
    let saveindex=document.getElementById("saveindex");
    let addtaskbtn=document.getElementById("addtaskbtn");
    let savetaskbtn=document.getElementById("savetaskbtn");
    saveindex.value=index;
    let webtask = localStorage.getItem("localtask");
    let taskobj=JSON.parse(webtask);
    addinput.value=taskobj[index];
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
}
let savetaskbtn=document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click",function()
{
    let webtask = localStorage.getItem("localtask");
    let taskobj=JSON.parse(webtask);
    let addtaskbtn=document.getElementById("addtaskbtn");
    let saveindex=document.getElementById("saveindex").value;
    taskobj[saveindex]=addinput.value;
    addtaskbtn.style.display="block";
    savetaskbtn.style.display="none";
    localStorage.setItem("localtask",JSON.stringify(taskobj));
    addinput.value='';
    showtask();

})



function deletetask(index)
{
    let webtask=localStorage.getItem("localtask");
    let taskobj=JSON.parse(webtask);
    taskobj.splice(index,1);
    localStorage.setItem("localtask",JSON.stringify(taskobj));
    showtask();   
}



let deletebtn=document.getElementById("deletebtn");
deletebtn.addEventListener("click",function(){
let savetaskbtn=document.getElementById("savetaskbtn");
let addtaskbtn=document.getElementById("addtaskbtn");
let webtask = localStorage.getItem("localtask");
let taskobj=JSON.parse(webtask);


if(webtask==null)
{
    taskobj=[];
}
else{
    taskobj=JSON.parse(webtask);
    taskobj=[];
}


savetaskbtn.style.display="none";
addtaskbtn.style.display="block";
localStorage.setItem("localtask",JSON.stringify(taskobj));
showtask();
})



let searchbox=document.getElementById("searchbox");
searchbox.addEventListener("input",()=>{
    let alltr=document.querySelectorAll("tr");
    Array.from(alltr).forEach((item)=>{
        let searchtxt=item.getElementsByTagName("td")[0].innerText;
        let searchboxval=searchbox.value;
        let re=new RegExp(searchboxval,'gi');
        if(searchtxt.match(re))
        {
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
        }
    })
})