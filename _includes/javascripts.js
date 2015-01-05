window.onscroll=function(){
    window.stackHeads();
};
window.stackHeads=function(){
    fixedHeads=document.getElementsByClassName('fixedheader');
    for(i=0;i<fixedHeads.length;i++){
        header=fixedHeads[i];
        nextheader=fixedHeads[i+1];
        holder=getPrevNext(header)[0];  
        if(window.pageYOffset>findPosY(holder)){
            //if our scroll position in the window is father than the placeholder of the current header's position in the DOM...
            if(typeof nextheader!='undefined'){
                //If this isn't the last header.
                dif=findPosY(nextheader)-window.pageYOffset;
                //the diference between our scroll position and the header's placeholder's position
                if(dif<header.offsetHeight){
                    //if we have less distance between the placeholder of the next element and the top of of the page than the height of the current header, we push the header up so it doesn't overlap. 
                    header.style.position="fixed";
                    header.style.top='-'+(header.offsetHeight-dif)+'px';
                    
                }
                else{
                    //if there is another header, but we have room
                    //console.log(header
                    holder.style.height=header.offsetHeight+'px';
                    header.style.position="fixed";
                    header.style.top="0px";
                }
                
            }
             
            else{
                                    
                holder.style.height=header.offsetHeight+'px';
                //if there isn't another header
                header.style.position="fixed";
                header.style.top="0px";
            }
           
            
        }
        else{
            holder.style.height='0px';
            //if we haven't gotten to the header yet
            header.style.position='static';
            header.style.removeProperty('top');
        }
        
    }
};
function getPrevNext(el){
    els=document.getElementsByTagName('*');
    for(j=0;j<els.length;j++){
        if(els[j]==el){
            return [els[j-1],els[j+1]];
        }
    }
    return false;
}

function findPosX(obj)
  {
    var curleft = 0;
    if(obj.offsetParent)
        while(1) 
        {
          curleft += obj.offsetLeft;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.x)
        curleft += obj.x;
    return curleft;
  }

  function findPosY(obj)
  {
    var curtop = 0;
    if(obj.offsetParent)
        while(1)
        {
          curtop += obj.offsetTop;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;
    return curtop;
  }
