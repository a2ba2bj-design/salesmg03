function page() {
    return (
      <div  className="container h-full w-full  flex justify-center items-center bg-blue-900">
          <form>
       <div className="flex justify-center items-center flex-col bg-blue-100 m-25 p-1">
      
            
               
              
                <input className="box-border border-3 p-2 m-1 text-blue-900"
              maxLength={10}
              placeholder="کدملی"
              type="text" pattern="\d{10,10}"  
              
              ></input>
                <input className="box-border border-3 p-2 m-1 text-blue-900"
              maxLength={10}
              placeholder="شماره همراه"
              type="text" pattern="\d{10,10}"  
              
              ></input>
                <input className="box-border border-3 p-2 m-1 text-blue-900"
              maxLength={12}
              placeholder="شماره حساب"
              type="text" pattern="\d{12,12}" 
              ></input>
              <input className="box-border border-3 p-2 m-1 text-blue-900"
              maxLength={24}
              placeholder="شبا"
              type="text" pattern="\d{24,24}"/>
          
                      < div className="flex flex-row justify-center items-center w-full ">
                            <button className=" box-border it border-0 m-1 cursor-pointer w-1/2 bg-blue-600 ">
                             <p className="text-center font-bold text-blue-50"> ثبت نام </p></button>
                             <button className=" box-border border-0 m-1 cursor-pointer w-1/2 bg-blue-600 ">
                             <p className="text-center font-bold text-blue-50">لغو</p></button>
                 </div> 
                                
          </div></form>
              
        </div>
    );
}

export default page;