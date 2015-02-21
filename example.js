angular.module( 'exampleApplication', [] )
  .controller( 'selectionController', function( $scope )
  {
    $scope.selectedItems = _.range( 0, 24 )
      .map( function( number )
      {
        return {
          "name": number
        }
      } );
    $scope.selectableItems = [
    {
      "name": 24
    } ];
    $scope.aSelection;

    $scope.replaceItemInSelectedItemsWithNewlySelectedItem = function( selectable, current )
    {

      var currentIndex = _.findIndex( $scope.selectedItems,
        function( item )
        {
          return current.name === item.name;
        } );

      var itemToSwitchWithCurrentSelection = removeFromSelecableItems( selectable );
      var currentSelection = removeFromSelectedItems( current );

      $scope.selectedItems.splice( currentIndex, 0, itemToSwitchWithCurrentSelection );
      addToSelectableItems( currentSelection );
    };

    $scope.selectUnselectedItem = function( selectable )
    {

      var selectedItem = removeFromSelecableItems( selectable );

      $scope.selectedItems.push( selectedItem );
      $scope.aSelection = null;
    };

    $scope.removeCurrentSelection = function( currentlySelected )
    {
      var selectionToRemove = removeFromSelectedItems( currentlySelected );

      addToSelectableItems( selectionToRemove );
    };

    function removeFromSelectedItems( itemToRemove )
    {
      return _.remove( $scope.selectedItems,
        function( item )
        {
          return itemToRemove.name === item.name;
        } )[ 0 ];
    }

    function removeFromSelecableItems( itemToRemove )
    {
      return _.remove( $scope.selectableItems,
        function( item )
        {
          return itemToRemove.name === item.name;
        } )[ 0 ];
    }

    function addToSelectableItems( itemToAdd )
    {
      $scope.selectableItems.push( itemToAdd );
      $scope.selectableItems = _.sortBy( $scope.selectableItems, 'name' );
    }

  } )
  .directive( 'selectedItem', function()
  {

    return {
      restrict: 'AE',
      templateUrl: 'selection-directive.tpl.html',
      scope:
      {
        selectableItems: '=',
        selectedItem: '=',
        changeHandler: '=',
        removeHandler: '='
      },
      link: function( scope, elements, attributes )
      {
        scope.currentItem = null;

        scope.$watch( 'selectedItem', function( old, newItem )
        {
          if ( newItem )
          {
            scope.currentItem = scope.selectedItem;
          }
        } );
      }
    };

  } );
