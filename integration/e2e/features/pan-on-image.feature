@android @iphone @desktop
Feature: Pan on image 
  In order to view high quality images of digitised items in great detail 
  As a user 
  I want to be able to pan in the image 

  Background: 
    Given the viewer is opened with a publication 

  Scenario: Panning on image 
    Given the viewer is in page view 
      And the view is zoomed in 
    When the user is dragging 
    Then the image is moved inside the view
