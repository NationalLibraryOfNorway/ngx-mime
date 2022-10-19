@zoom
Feature: Zoom
  In order to view high quality images in great detail
  As a user
  I want to be able to zoom an image in and out at any level

  Background:
    Given the viewer is opened with a publication

  @ignore @android @iphone
  Scenario: Zooming in on mobile
    Given the zoom level is home
    When the user pinch out
    Then the current zoom level has increased

  @ignore @android @iphone
  Scenario: Zooming out on mobile
    Given the view is zoomed in
    When the user pinch out
    Then the current zoom level has increased

  @ignore @android @iphone
  Scenario: Zooming out on mobile
    Given the view is zoomed in
    When the user pinch in
    Then the current zoom level has decreased

  @ignore @android @iphone
  Scenario: Auto zooming in on mobile
    Given the zoom level is home
    When the user double taps
    Then the current zoom level has increased

  @ignore @android @iphone
  Scenario: Auto zooming out on mobile
    Given the view is zoomed in
    When the user double taps
    Then the current zoom level is home
    And the view should be vertically centered

  @ignore @desktop
  Scenario: Auto zooming in on desktop
    Given the zoom level is home
    When the user double click
    Then the current zoom level has increased

  @ignore @desktop
  Scenario: Auto zooming out on desktop
    Given the view is zoomed in
    When the user double click
    Then the current zoom level is home
    And the view should be vertically centered

  @desktop
  Scenario: Zooming in on desktop
    Given the zoom level is home
    When the user click zoom in button
    Then the current zoom level has increased

  @desktop
  Scenario: Zooming out on desktop from home
    Given the zoom level is home
    When the user click zoom out button
    Then the current zoom level is home

  @desktop
  Scenario: Zooming out on desktop
    Given the view is zoomed in
    When the user click zoom out button
    Then the current zoom level has decreased
