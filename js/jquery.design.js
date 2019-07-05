/*!

=========================================================
* Form Design - v0.0.1
=========================================================

* Product Page:
* Copyright 2019 Hamide Yüce ()
* Licensed under MIT ()

* Coded by hamide yuce

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
(function ($) {

    'use strict';
    $(function () {

        var iContentArea = $('.iContent_Area') ,
            iContentSection ,
            iContentSectionContent,
            iContentSectionButton,
            iContentSectionField,
            iContentSectionHead,
            iContentSectionBody,
            iContentSectionFooter,
            iContentSectionImage
        ;

        var setContent = function(){
            iContentSection                 = iContentArea.find('div').eq(0),
            iContentSectionContent          = iContentSection.find('div').eq(0),
            iContentSectionButton           = $('button', iContentSection),
            iContentSectionHead             = $('h3', iContentSection),
            iContentSectionImage            = iContentSectionContent.find('div').eq(1),
            iContentSectionBody             = iContentSectionHead.nextAll().eq(0),
            iContentSectionField            = iContentSectionHead.nextAll().eq(1),
            iContentSectionFooter           = iContentSectionHead.nextAll().eq(2);
            fieldLabels.set();
            buttonStyle.set();
            availableFields.set();
            contentTexts.set();
            contentImage.set();

        }

        iContentArea.load( 'i_top.html', setContent);

        var imageAlignment =  (function () {

            var
                imageAlignment  = $('.imageAlignment'),
                iButton         = $('.imageAlignment_iButton', imageAlignment);

               iButton.on('click', function () {
                   var b = $(this);
                   iContentArea.load( b.attr('data-layout')+'.html', function() {
                       setContent();
                       iButton.removeClass('btn-primary btn-secondary');
                       b.addClass('btn-primary');
                       iButton.not('[class*=\'btn-primary\']').addClass('btn-secondary');
                   });
               });

        }());

        var fieldLabels =  (function () {

            var
                fontFamily          = $('.fieldLabels_FontFamily'),
                textColor           = $('.fieldLabels_TextColor'),
                backgroundColor     = $('.fieldLabels_BackgroundColor')
            ;
            fontFamily.on('change', function () {
                iContentSection.css("font-family", $('option:selected', this).css("font-family"));
            });

            textColor.on('change', function () {
                iContentSection.css("color", $(this).val());
                iContentSectionHead.css("color", $(this).val());
            });

            backgroundColor.on('change', function () {
                iContentSectionContent.css("background-color", $(this).val());
            });

            return{
                set : function(){
                    fontFamily.trigger('change');
                    textColor.trigger('change');
                    backgroundColor.trigger('change');
                }
            }

        }());

        var buttonStyle =  (function () {

            var
                buttonText        = $('.buttonStyle_Text'),
                textColor         = $('.buttonStyle_TextColor'),
                backgroundColor   = $('.buttonStyle_BackgroundColor'),
                aligment          = $('.buttonStyle_Aligment')
            ;
            buttonText.on('keyup', function () {
                var lbl = $(this).val().trim();
                iContentSectionButton.html(lbl ? lbl :'Subscribe');
            });

            textColor.on('change', function () {
                iContentSectionButton.css("color", $(this).val());
            });

            backgroundColor.on('change', function () {
                iContentSectionButton.css("border-color", $(this).val());
                iContentSectionButton.css("background-color", $(this).val());
            });

            aligment.on('change', function () {
                if($(this).val() !='full') {
                    iContentSectionButton.css("width", '');
                    iContentSectionButton.parent().css("text-align", $(this).val());
                }else{
                    iContentSectionButton.css("width", "100%");
                }

            });

            return{
                set : function(){
                    buttonText.trigger('keyup');
                    textColor.trigger('change');
                    backgroundColor.trigger('change');
                    aligment.trigger('change');
                }
            }

        }());

        var availableFields =  (function () {
            var
                fieldCheck        = $('.availableFields_Check'),
                emailField         = '<div class="form-group availableFields_email">\n' +
                    '                                        <div class="input-group mb-4">\n' +
                    '                                            <div class="input-group-prepend">\n' +
                    '                                                <span class="input-group-text"><i class="ni ni-email-83"></i></span>\n' +
                    '                                            </div>\n' +
                    '                                            <input class="form-control" placeholder="Email" type="text">\n' +
                    '                                        </div>\n' +
                    '                                    </div>',
                nameField         = '<div class="form-group availableFields_name">\n' +
                    '                                        <div class="input-group mb-4">\n' +
                    '                                            <div class="input-group-prepend">\n' +
                    '                                                <span class="input-group-text"><i class="ni ni-circle-08"></i></span>\n' +
                    '                                            </div>\n' +
                    '                                            <input class="form-control" placeholder="Name" type="text">\n' +
                    '                                        </div>\n' +
                    '                                    </div>',
                phoneField         = '<div class="form-group availableFields_phone">\n' +
                    '                                        <div class="input-group mb-4">\n' +
                    '                                            <div class="input-group-prepend">\n' +
                    '                                                <span class="input-group-text"><i class="ni ni-mobile-button"></i></span>\n' +
                    '                                            </div>\n' +
                    '                                            <input class="form-control" placeholder="Phone" type="text">\n' +
                    '                                        </div>\n' +
                    '                                    </div>'
            ;

            var elementControl = function () {
                var val = $(this).val(), isCheck = $(this).is(':checked');
                switch (val) {
                    case 'email' :
                        if(isCheck) iContentSectionField.append(emailField);
                        else $('.availableFields_email', iContentSectionField).remove();
                        break;
                    case 'name' :
                        if(isCheck) iContentSectionField.append(nameField);
                        else $('.availableFields_name', iContentSectionField).remove();
                        break;
                    case 'phone' :
                        if(isCheck) iContentSectionField.append(phoneField);
                        else $('.availableFields_phone', iContentSectionField).remove();
                        break;
                }
            }
            fieldCheck.on('click', elementControl );

            return{
                set : function(){
                    fieldCheck.each(elementControl);
                }
            }
        }());

        var contentTexts =  (function () {

            var
                contentHeadText     = $('.contentHead_text'),
                contentBodyText     = $('.contentBody_text'),
                contentFooterText   = $('.contentFooter_text');

            contentHeadText.on('keyup', function () {
                var text = $(this).val();

                if(text.length > 0 && text.length <= 250) {
                    contentHeadText.removeClass('is-invalid');
                    iContentSectionHead.html(text);
                }else if(!text.length){
                    iContentSectionHead.html(contentHeadText.attr('placeholder'));
                }else{
                    contentHeadText.addClass('is-invalid');
                }
            });

            contentBodyText.on('change', function () {
                var text = $(this).val();

                if(text.length > 0) {
                    iContentSectionBody.html(text);
                }else if(!text.length){
                    iContentSectionBody.html(contentBodyText.attr('placeholder'));
                }
            });

            contentFooterText.on('change', function () {
                var text = $(this).val();

                if(text.length > 0) {
                    iContentSectionFooter.html(text);
                }else if(!text.length){
                    iContentSectionFooter.html(contentFooterText.attr('placeholder'));
                }
            });

            return{
                set : function(){
                    contentHeadText.trigger('keyup');
                    contentBodyText.trigger('change');
                    contentFooterText.trigger('change');
                }
            }

        }());

        var contentImage =  (function () {

            var
                browseImageBtn     = $('.contentImage').find('a').eq(0),
                deleteImageBtn     = $('.contentImage').find('a').eq(1),
                thumbImage         = $('.contentImage img'),
                browseImage        = $('.contentImage input:file');

             browseImageBtn.on('click', function () {
                 browseImage.trigger('click');
            });

            deleteImageBtn.on('click', function () {
                $(this).parent().addClass('d-none');
                iContentSectionImage.css('background-image', 'url(../placeholder.jpg)');
                thumbImage.prop('src', 'empty-image.svg' );
            });

             browseImage.on('change', function () {
                 var file = $(this);
                 var files = file.prop('files');
                 var url = $(this).val();
                 var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();

                 if (files && files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
                     var reader = new FileReader();
                     reader.onload = function (e) {
                         iContentSectionImage.css('background-image', 'url('+ e.target.result+')');
                         thumbImage.prop('src', e.target.result );
                         browseImageBtn.next().removeClass('d-none');
                     }
                     reader.readAsDataURL(files[0]);
                 }
             });

            return{
                set : function(){
                    browseImage.trigger('change');
                }
            }

        }());

        var publishContent =  (function () {
            var
                formPublish = $('.formPublish'),
                formDownload = $('.formDownload')
            ;

            formPublish.on('click', function(){

                var formHtml =  iContentSection.html();
                var data = new Blob([formHtml], {type: 'text/html'});
                if (formHtml !== null) {
                    window.URL.revokeObjectURL(formHtml);
                }
                var DonwloadLink  = window.URL.createObjectURL(data);
                window.location.href = DonwloadLink;

            });

        }());

    });

}(jQuery));
