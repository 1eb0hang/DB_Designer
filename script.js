// initialize ctx menu
{
  const ctx = document.getElementById("ctx")
  const updateCtxPosition = (x, y)=>{
    const maxLeft = window.innerWidth - ctx.offsetWidth;
    const maxTop = window.innerHeight - ctx.offsetHeight;

    ctx.style.left = `${Math.min(maxLeft,x)}px`;
    ctx.style.top = `${Math.min(maxTop, y)}px`;
  };

  document.addEventListener("contextmenu", (e)=>{
    e.preventDefault();
    updateCtxPosition(e.clientX, e.clientY);
    ctx.style.visibility = "visible";
  });

  document.addEventListener("click", ()=>{
    ctx.style.visibility = null;
  })
}
