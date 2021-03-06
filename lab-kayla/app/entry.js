'use strict'

require('./scss/main.scss')

const path = require('path')
const angular = require('angular')
const camelcase = require('camelcase')
const pascalcase = require('pascalcase')
const ngTouch = require('angular-touch')// eslint-disable-line
const ngAnimate = require('angular-animate')// eslint-disable-line
require('ng-file-upload')
require('@uirouter/angularjs')
require('angular-ui-bootstrap')

const cfgram = angular.module('cfgram', ['ui.router', 'ngFileUpload', 'ngTouch', 'ngAnimate', 'ui.bootstrap'])

let context = require.context('./config/', true, /\.js$/)
context.keys().forEach(path => cfgram.config(context(path)))

context = require.context('./view/', true, /\.js$/)
context.keys().forEach(key => cfgram.controller(pascalcase(path.basename(key, '.js')), context(key)))

context = require.context('./service/', true, /\.js$/)
context.keys().forEach(key => cfgram.service(camelcase(path.basename(key, '.js')), context(key)))

context = require.context('./component/', true, /\.js$/)
context.keys().forEach(key => cfgram.component(camelcase(path.basename(key, '.js')), context(key)))

context = require.context('./filter/', true, /\.js$/)
context.keys().forEach(key => cfgram.filter(camelcase(path.basename(key, '.js')), context(key)))
