# Kettle Corn Demo

This project demos synchronizing embedded videos with a other components on a
web page. It uses React and MobX. Certain pieces of this demo will be released
to NPM as soon as they are baked a little bit.

The premise is that there is a MobX store that is updated with video data from
the embedding component. This store (I'm calling it a Kettle, which is a bit of
an inside joke) can then be observed by other components (or other MobX stores)
and other parts of the UI can stay in sync with the progress of the video.

The Kettle also supports sending message to the video player. This often isn't
supported in current react video wrappers. Right now, the only messages we can
send are Play, Pause, and Seek To. More may follow. We'll see.
