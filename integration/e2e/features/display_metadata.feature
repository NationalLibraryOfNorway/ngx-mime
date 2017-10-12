@metdata @android @iphone @desktop
Feature: Displaying Metadata
  In order to understand more about the publication
  As a user
  I want to be able to see the metadata associated with it

  Background:
    Given the viewer is opened with a publication

  Scenario: Show descriptive metadata
    Given the viewer is in dashboard view
    And the viewer is in metadata view
    Then descriptive metadata are displayed to the user
