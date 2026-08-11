import ExpoModulesCore
import UIKit

public final class ScreenCornerSurfaceModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ScreenCornerSurface")

    View(ScreenCornerSurfaceView.self) {
      Prop("fallbackRadius") { (view, radius: Double) in
        view.setFallbackRadius(CGFloat(radius))
      }
    }
  }
}

final class ScreenCornerSurfaceView: ExpoView {
  private var fallbackRadius: CGFloat = 55
  private var didResolveDisplayRadius = false

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)

    layer.cornerCurve = .continuous
    applyCornerConfiguration()
  }

  func setFallbackRadius(_ radius: CGFloat) {
    fallbackRadius = radius

    guard !didResolveDisplayRadius else {
      return
    }

    applyCornerConfiguration()
  }

  override func layoutSubviews() {
    super.layoutSubviews()

    guard
      !didResolveDisplayRadius,
      window != nil,
      bounds.width > 0,
      bounds.height > 0
    else {
      return
    }

    if #available(iOS 26.0, *) {
      let radius = effectiveRadius(corner: .topLeft)

      guard radius > 0 else {
        return
      }

      cornerConfiguration = .corners(radius: .fixed(radius))
      didResolveDisplayRadius = true
    }
  }

  private func applyCornerConfiguration() {
    if #available(iOS 26.0, *) {
      cornerConfiguration = .corners(radius: .containerConcentric())
    } else {
      layer.cornerRadius = fallbackRadius
    }
  }
}
