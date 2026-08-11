import ExpoModulesCore
import UIKit

public final class ScreenCornerSurfaceModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ScreenCornerSurface")

    View(ScreenCornerSurfaceView.self) {
      Prop("castsShadow", false) { (view, castsShadow: Bool) in
        view.setCastsShadow(castsShadow)
      }

      Prop("fallbackRadius") { (view, radius: Double) in
        view.setFallbackRadius(CGFloat(radius))
      }
    }
  }
}

final class ScreenCornerSurfaceView: ExpoView {
  private enum SurfaceShadow {
    static let color = UIColor.black.cgColor
    static let offset = CGSize(width: -8, height: 0)
    static let opacity: Float = 0.14
    static let radius: CGFloat = 20
  }

  private var fallbackRadius: CGFloat = 55
  private var didResolveDisplayRadius = false

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)

    layer.cornerCurve = .continuous
    applyCornerConfiguration()
  }

  func setCastsShadow(_ castsShadow: Bool) {
    layer.shadowColor = castsShadow ? SurfaceShadow.color : nil
    layer.shadowOffset = castsShadow ? SurfaceShadow.offset : .zero
    layer.shadowOpacity = castsShadow ? SurfaceShadow.opacity : 0
    layer.shadowRadius = castsShadow ? SurfaceShadow.radius : 0

    // Let Core Animation derive the shadow from the view's composited alpha.
    // This keeps it on the same continuous corner instead of a rectangular path.
    layer.shadowPath = nil
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
