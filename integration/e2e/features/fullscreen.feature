Feature: Viewing publications in Full Screen mode 
  In order to view high quality images in great detail 
  As a user 
  I want the viewer to be presented using the entire screen 

  Background: 
    Given the viewer is opened with a publication 

  Scenario: Full Screen Mode 
    Given the viewer is in page view
    When the user select full screen mode
    Then the viewer should be presented using the entire screen
