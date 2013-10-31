window.onload=function()
{
    function makeWYSIWYG(editor)
    {
        //If the DOM element we want to edit exists
        if(editor)
        {
            //We create the buttons container
            var buttons_container = document.createElement('div');
            
            //We define some properties to it...
            buttons_container.style.textAlign='center';
            buttons_container.style.marginTop='5px';
            buttons_container.className='makeWYSIWYG_buttons_container';
            
            //We create the buttons inside the container
            buttons_container.innerHTML=''+
                '<button class="makeWYSIWYG_editButton">Edit</button>'+
                '<button class="makeWYSIWYG_viewHTML">View HTML</button>'+
                '<div class="makeWYSIWYG_buttons" style="display: none;">'+
                    '<button data-tag="bold"><b>Bold</b></button>'+
                    '<button data-tag="italic"><em>Italic</em></button>'+
                    '<button data-tag="underline"><ins>Underline</ins></button>'+
                    '<button data-tag="strikeThrough"><del>Strike</del></button>'+
                    '<button data-tag="insertUnorderedList">&bull; Unordered List</button>'+
                    '<button data-tag="insertOrderedList">1. Ordered List</button>'+
                    '<button data-tag="createLink"><ins style="color: blue;">Link</ins></button>'+
                    '<button data-tag="insertImage">Image</button>'+
                    '<button data-value="h1" data-tag="heading">Main title</button>'+
                    '<button data-value="h2" data-tag="heading">Subtitle</button><br />'+
                    '<button data-tag="removeFormat">Remove format</button>'+
                '</div>';
                
            //We insert the buttons after the editor
            var parent = editor.parentNode;

            if(parent.lastchild == editor)
            {
                parent.appendChild(buttons_container);
            }
            else
            {
                parent.insertBefore(buttons_container, editor.nextSibling);
            }
            
            editor.isEditable=false; //By default, the element is not editable
            editor.setAttribute('contenteditable', false);
            
            //This function permits to make the element editable or not
            editor.makeEditable = function(bool)
            {
                //Protect the value
                bool = bool==undefined?true:(typeof bool === 'boolean'?bool:true);
                
                //Change the editable state
                this.isEditable=bool;
                this.setAttribute('contenteditable',bool);
                
                //Show/Hide the buttons
                if(bool)
                {
                    buttons_container.querySelector('.makeWYSIWYG_buttons').style.display='block';
                }
                else
                {
                    buttons_container.querySelector('.makeWYSIWYG_buttons').style.display='none';
                }
            };
            
            //Click on the "Edit" button
            buttons_container.querySelector('.makeWYSIWYG_editButton').addEventListener('click',function(e)
            {
                if(editor.isEditable)
                {
                    editor.makeEditable(false);
                    this.innerHTML='Edit';
                }
                else
                {
                    editor.makeEditable(true);
                    this.innerHTML='Save';
                }
                e.preventDefault();
            },false);
            
            //Click on the "View HTML" button
            buttons_container.querySelector('.makeWYSIWYG_viewHTML').addEventListener('click',function(e)
            {
                alert(editor.innerHTML);
                e.preventDefault();
            },false);
            
            //Get the format buttons
            var buttons = buttons_container.querySelectorAll('button[data-tag]');
            
            //For each of them...
            for(var i=0, l=buttons.length; i<l; i++)
            {
                //We bind the click event
                buttons[i].addEventListener('click',function(e)
                {
                    var tag = this.getAttribute('data-tag');
                    switch(tag)
                    {
                        case 'createLink':
                            var link = prompt('Please specify the link.');
                            if(link)
                            {
                                document.execCommand('createLink', false, link);
                            }
                        break;
                        
                        case 'insertImage':
                            var src = prompt('Please specify the link of the image.');
                            if(src)
                            {
                                document.execCommand('insertImage', false, src);
                            }
                        break;
                        
                        case 'heading':
                            try
                            {
                                document.execCommand(tag, false, this.getAttribute('data-value'));
                            }
                            catch(e)
                            {
                                //The browser doesn't support "heading" command, we use an alternative
                                document.execCommand('formatBlock', false, '<'+this.getAttribute('data-value')+'>');
                            }
                        break;
                        
                        default:
                            document.execCommand(tag, false, this.getAttribute('data-value'));
                    }
                    e.preventDefault();
                });
            }
        }			
        return editor;
    };
    
    makeWYSIWYG(document.getElementById('editor'));
};

