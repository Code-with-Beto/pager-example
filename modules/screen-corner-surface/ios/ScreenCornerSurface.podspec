Pod::Spec.new do |s|
  s.name           = 'ScreenCornerSurface'
  s.version        = '1.0.0'
  s.summary        = 'A display-concentric corner surface for the swipe menu example'
  s.description    = 'Uses the public iOS concentric corner API with a legacy fallback.'
  s.author         = 'Code with Beto'
  s.homepage       = 'https://codewithbeto.dev'
  s.platforms      = { :ios => '16.4' }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = '**/*.{h,m,mm,swift,hpp,cpp}'
end
