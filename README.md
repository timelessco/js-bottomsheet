# Js Bottomsheet
A pure Js snappable, scrollable, customisable bottomsheet!

## Features
- Works as a modal in web and as a bottomsheet in mobile.
- Supports multiple snap points.
- Spring animations.
- Supports stacking of bottomsheets.
- Is scrollable at the last snappoint.
- Supports dynamic content.

##Installation

## Usage

Here's a simple usage of the bottomsheet with static content.

HTML:
```
  <button id="trigger-1" data-bottomsheet-id='bottomsheet-1'>click</button>
  <div id="bottomsheet-1" data-bottomsheet>The Bottomsheet</div>
```

The trigger should have an ID which would be used in the initialisation of the bottomsheet, and a data attribute containing the ID referring to 
it's corresponding bottomsheet ```data-bottomsheet-id=[id]```. 
The bottomsheet should have the ID as well as the data attribute ```data-bottomsheet```

JS:
```
BottomSheet({
  trigger: 'trigger-1',
});
```
This would create a simple bottomsheet with the default props.

## Props:

 ### trigger:
 The Id of the trigger element.
 > Type: string
 
 ### snapPoints:
 An array of all the snappoints percentages you'd like the bottomsheet to snap at, from bottom to top.
 > Type: Array of strings
 
 > Default: ['100%']
 
 eg: 
 ```
 BottomSheet({
  trigger: 'trigger-1',
  snappoints: ['20%', '60%', '100%']
});
```

### displayOverlay:
A boolean defining whether to display an overlay or not.
> Type: Boolean

> Default: false




