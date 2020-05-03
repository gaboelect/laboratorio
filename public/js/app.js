document.addEventListener('DOMContentLoaded', e => {

    function init() {
    
        $("[class*='mostrar']").click(function () {
    
            let modulo = $(this).data('module');
            
            console.log(modulo);
    
            $(`#vista-${modulo}`).load(`public/modulos/${modulo}/${modulo}.html`, function () {
    
                $(`#close-${modulo}`).click(function () {
                    
                    $(`#vista-${modulo}`).hide( "puff", "slow" );
                    $(`#vista-${modulo}`).html("");
    
                });
    
            }).draggable().show( "scale", 1000 );
    
    
        });
    
    }
    
    init();

})