function formatFloat(value = 0, n = 2) {
    // var f = Math.floor(value*Math.pow(10,n))/Math.pow(10,n);
			// var s = f.toString();
			var s = value.toString();
			var rs = s.indexOf('.');  
			if (rs >= 0) {
				s = s.substr(0, rs + n + 1);
			}
			 
			if (rs < 0) {     
				s += '.';   
			} 
			for(var i = s.length - s.indexOf('.'); i <= n; i++){
				s += "0";
			}
			return s;
  }

export default formatFloat;  