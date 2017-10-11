$(document).ready(function(){

    $('#search__input').on({

        // keydown function

        keydown:function(){
            if($('#search__input').val().length > 0){
                $('#search__res').stop(true, true).show('slow',         function(){
                        $('#search__res').css('display' ,'block').fadeIn(1500);
                });
            }
        },
        
        // search input when typing

        focus:function(){
         
                $('.place__holder').css({
                    top:'-10px',
                    left: '0',
                    'font-size':'14px',
                    color: '#333'
                });
        },

        // search input on blur

        blur:function(){

            if($(this).val().length > 0){
                $('.place__holder').css({
                    top:'-10px',
                    left: '0',
                    'font-size':'14px',
                    color: '#333'
                });
            }

            else{
                $('.place__holder').css({
                    top:'',
                    left: '',
                    'font-size':'',
                    color: ''
                });
            }
        },

        // searching and showing result

        keyup:function(e){

            var $input= $('#search__input'),
            $items= $('.text__box p'),
            $item= $(),
            itemsIndexed=[];

            var string  =$items.text();
            var searchList  = document.getElementById("search__res"); 
            
            function getPortions(queryString, string) {
              var results = [];
              if(queryString.length > 0){
                var rgxp = new RegExp("(\\S*)?("+ queryString +")(\\S*)?", "ig");
                string.replace(rgxp, function(match, $1, $2, $3){
                  results.push( ($1||"") +"<li><b>"+ $2 +"</b>"+ ($3||"</li>") );
                });
                $(this).on('click', function(f){
                    f.preventDefault();
                   $('#search__input').val($(f.target).parent('li').text());
                });
              }
              return results;
            }
            
            document.getElementById("search__input").addEventListener("input", function(){
              var result = getPortions(this.value, string);
             searchList.innerHTML = "Found "+ result.length +" results <br>"+ result.join(""); 
            });
    
            $items.each( function()
            {
                itemsIndexed.push( $(this).text().replace( /\s{2,}/g, ' ' ).toLowerCase() );
            });
            
            $items.each( function()
            {
                $item = $( this );
                $item.html( $item.html().replace( /<span class="highlight">([^<]+)<\/span>/gi, '$1' ) );
            });

            var searchVal = $.trim($input.val()).toLowerCase();
            if( searchVal.length )
            {            
                for( var i in itemsIndexed )
                {
                    $item = $items.eq(i);
                    if( itemsIndexed[i].indexOf( searchVal ) != -1 ){
                        $item.html( $item.html().replace( new RegExp( searchVal+'(?!([^<]+)?>)', 'gi' ), '<span class="highlight">$&</span>' ) );
                    }
                }
            }
        }
    });

    var isOpen = false;

    $(window).click(function(e){

        if (isOpen == false){
            if(!$(e.target).closest('#search__res').length){
                $('#search__res').stop(true,true).hide('slow', function(){
                    $('#search__res').css('display' ,'').fadeOut(500);
                });

            }
            isOpen = true;
        }
        else{
            isOpen = false;
        }

    });
   
   
});
