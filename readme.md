# Floating Diagram 

This is a simple integration of canvas based lines into a HTML CSS based diagram. 

Add your own animation, feel free to change the amount of circles and their posision and the canvas produced lines will stay nice and floating.

## DEMO

Checkout the demo -> (https://web-designed.github.io/Floating-Diagram/test.html)

## Add your markup like this:

```html
	<canvas id="canvas" width="100%" height="100%"></canvas>
	<div id="floating-diagram-wrapper">
		<div class="floating-circle" data-init-x="50" data-init-y="50">
	      <div id="inner-0" class="inner" data-connect-to="#inner-1">
	        <div class="circle-text-wrapper">Javascript</div>
	      </div>
	    </div>
	    <div class="floating-circle" data-init-x="50" data-init-y="50">
	      <div id="inner-1" class="inner" data-connect-to="#inner-1, #inner-2,">
	        <div class="circle-text-wrapper">Javascript</div>
	      </div>
	    </div>
	</div>

```


## Your options are:


```html

	data-init-x="50" - horizontal position in the viewport (0-100)
	data-init-y="50" - vertical position in the viewport (0-100)
    data-connect-to="#inner-1, #inner-2" - which circles should be connected to a given circle

```