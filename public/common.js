
var STEP_MAX = 10;
var LEVEL_MAX = 3;
const FORM_MODE_NEW = 1;
const FORM_MODE_EDIT = 2;
const FORM_MODE_VIEW = 3;
const DEFAULT_DATE_FORMAT =  "DD/MM/yyyy";

const LOAIDONVI_CAT = 1;
const LOAIDONVI_PHONGBAN = 2;
const LOAIDONVI_QUANHUYEN = 3;
const LOAIDONVI_DOI = 4;
const LOAIDONVI_PHUONGXA = 5;

const VALID_FILE_EXTENSIONS = ['bm2'];
const UNITS_NO_BCN = [2,3,4,5,6,7,8,17,18,25];
const API_URL = "http://10.153.3.23:207/api/";
function public_active_sidebar_item(router_link){
  let a  = $("aside .nav-link");   
  a.toArray().forEach(element => {  
  if($(element).attr('href') == router_link){       
    element.classList.remove('collapsed');     
  }
  });

  let b = $("aside .nav-item");
  b.toArray().forEach(element => {   
    let c1 =  $(element).find(".nav-link").toArray(); 
    if(c1.length>0){
      c1 = c1[0];      
    }
    let c3 = $(element).find(".nav-content").toArray();   
    if(c3.length>0){
      c3 = c3[0];      
    }
    $(element).find("li a").toArray().forEach(element_child => {  
      if($(element_child).attr('href') == router_link){ 
        element_child.classList.add('active');  
        c1.classList.remove('collapsed');
        c3.classList.add('show');
      
        return;
      }
      });    
  });
     

}
function isIntegerNumber(value) {
  
  if (value.length == 0) {
      return false;
  }
  return /^\d*$/.test(value);
}