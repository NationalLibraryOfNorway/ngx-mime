@desktop
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

  @Ignore-firefox
  Scenario: Panning should be disabled when i page mode
    Given the viewer is in page view
    When the user hits ArrowUp
    Then the image is not moved inside the view

  @Ignore-firefox
  Scenario: Panning should be disabled when i dashboard mode
    Given the viewer is in dashboard view
    When the user hits ArrowUp
    Then the image is not moved inside the view

  @Ignore-firefox
  Scenario: Viewer should pan when user use arrow keys when viewer is zoomed in
    Given zoom level is home
      And the user double click
    When the user hits ArrowUp
    Then the image is moved inside the view
