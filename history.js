function addToHistory(image, music, quote) {
    var obj = {
        image,
        music,
        quote
    }
    $.ajax({
      url:'http://localhost:3000/history',
      method:'POST',
      dataType:"JSON",
      data:obj,
      success:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    });
}
