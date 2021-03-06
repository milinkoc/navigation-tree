$(document).ready(function() {
			
			$('#navTree').on('click', 'li span', function(e) {
				e.preventDefault();
				$(this).closest('li').children('ul').toggle();
			});
			
			$('#navTree').on('click', 'li a:contains("ok")', function(e) {
				e.preventDefault();
				$(this).parent('div').hide();
				$(this).parent('div').next('div').children('span').text($(this).prev('input').val());
				$(this).parent('div').next('div').show();
			});
			
			$('#navTree').on('click', 'li a:contains("edit")', function(e) {
				e.preventDefault();
				
				$(this).parent('div').hide();
				
				if ($(this).parent('div').prev('div').length == 0) {

					$(this).closest('li').prepend('<div><input type="text" /> <a href="#" >ok</a></div>');
					$(this).parent('div').prev('div').children('input').val($(this).prev('span').text());
				}
				else
				{
					$(this).parent('div').prev('div').show();
				}
			});
			
			$('#navTree').on('click', 'li a:contains("delete")', function(e) {
				e.preventDefault();
				if (confirm("Are you sure you want to delete this category?")) {
					$(this).closest('li').remove();
				}				
			});
			
			$('#navTree').on('click', 'li a:contains("add a child")', function(e) {
				e.preventDefault();
				
				if ($(this).closest('li').children('ul').length == 0) {
					$(this).closest('li').append('<ul class="list-group default-padding" parent-count="1"></ul>');
				}
				
				var level = $(this).closest('li').parents('ul').length;
				
				var count = $(this).closest('li').children('ul').attr('parent-count');
				var catNumber = count;
				
				if (level > 1) {
					if ($(this).closest('li').children('ul').is(":hidden")) {
						$(this).closest('li').children('ul').show();
					}
					
					catNumber = '';
					//var parentId = $(this).closest('li > div').children('span').text().replace("Category ", "");

					$($(this).closest('li').parents('li:not(:last)').get().reverse()).each(function() {
							catNumber += $(this).attr('count') + '.';
					});
					
					catNumber += $(this).closest('li').attr('count') + '.';
					catNumber += count;
				}
				
				$(this).closest('li').children('ul').append('<li class="list-group-item" count=' + count + '><div><span>Category ' + catNumber + '</span> - <a href="#">edit</a> | <a href="#">delete</a> | <a href="#">add a child</a></div></li>');
				
				count++;
				$(this).closest('li').children('ul').attr('parent-count', count);
			});
			
		});