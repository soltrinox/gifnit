/*
* Copyright (c) 2015 Razeware LLC
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

import UIKit
import TVMLKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?
  var appController: TVApplicationController?

  func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
    window = UIWindow(frame: UIScreen.mainScreen().bounds)
    
    let appControllerContext = TVApplicationControllerContext()
    appControllerContext.launchOptions = [
      "initialJSDependencies" : initialJSDependencies()
    ]
    
    let javascriptURL = NSBundle.mainBundle().URLForResource("main",
      withExtension: "js")
    appControllerContext.javaScriptApplicationURL = javascriptURL!
    
    appController = TVApplicationController(
      context: appControllerContext, window: window,
      delegate: self)

    return true
  }
}

extension AppDelegate {
  private func initialJSDependencies() -> [String] {
    return [
      "mustache.min",
      "ResourceLoader"
      ].flatMap {
        let url = NSBundle.mainBundle().URLForResource($0, withExtension: "js")
        return url?.absoluteString
    }
  }
}


extension AppDelegate : TVApplicationControllerDelegate {
  func appController(appController: TVApplicationController,
    evaluateAppJavaScriptInContext jsContext: JSContext) {
      
      jsContext.setObject(ResourceLoader.self,
        forKeyedSubscript: "NativeResourceLoader")
  }
}

