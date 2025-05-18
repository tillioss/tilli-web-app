import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import MyConstant from "../../config/MyConstant";
import MyConfig from '../../config/myConfig';


let script;
function GodotPlay(props) {
    const [engine, setEngine] = useState(null)
    const [godDotDocsId, setGodDotDocsId] = useState("")
    useEffect(() => {
        let { match } = props;
        if (match) {
            let { params } = match;
            if (params) {
                let { gameId } = params;
                if (gameId !== "" && gameId) {
                    setGodDotDocsId(gameId)
                    setScript(gameId);
                }
            }
        }


        async function setScript(docsId) {
            script = document.createElement("script")
            script.src = `${MyConstant.keyList.apiURL}vp-game-file/module/zip/${docsId}/index.js`
            script.async = true
            script.onload = onLoad
            document.body.appendChild(script)

            
            if (MyConfig.isLocal) {
                setTimeout(() => {
                    console.log("Delayed for 4 second.");
                    window.location.href = '/' + MyConstant.keyList.projectUrl + `/godot-redirect`
                }, 6000)
            }



        }

        
        function onLoad() {
            if (godDotDocsId && godDotDocsId !== "") {
                const GODOT_CONFIG = { "args": [], "canvasResizePolicy": 2, "executable": `${MyConstant.keyList.apiURL}vp-game-file/module/zip/${godDotDocsId}/index`, "experimentalVK": false, "fileSizes": { pck: 1703792, wasm: 17503191 }, "focusCanvas": true, "gdnativeLibs": [] };
                var engine = window.Engine(GODOT_CONFIG);
                setEngine(engine)
            }
        }
        return () => {
            document.body.removeChild(script)
        }
    }, [godDotDocsId, props])

    
    useEffect(() => {
        if (engine) {
            const INDETERMINATE_STATUS_STEP_MS = 100;
            var statusProgress = document.getElementById('status-progress');
            var statusProgressInner = document.getElementById('status-progress-inner');
            var statusIndeterminate = document.getElementById('status-indeterminate');
            var statusNotice = document.getElementById('status-notice');

            var initializing = true;
            var statusMode = 'hidden';

            var animationCallbacks = [];
            function animate(time) {
                animationCallbacks.forEach(callback => callback(time));
                requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);

            function setStatusMode(mode) {

                if (statusMode === mode || !initializing)
                    return;
                [statusProgress, statusIndeterminate, statusNotice].forEach(elem => {
                    elem.style.display = 'none';
                });
                animationCallbacks = animationCallbacks.filter(function (value) {
                    return (value !== animateStatusIndeterminate);
                });
                switch (mode) {
                    case 'progress':
                        statusProgress.style.display = 'block';
                        break;
                    case 'indeterminate':
                        statusIndeterminate.style.display = 'block';
                        animationCallbacks.push(animateStatusIndeterminate);
                        break;
                    case 'notice':
                        statusNotice.style.display = 'block';
                        break;
                    case 'hidden':
                        break;
                    default:
                        throw new Error('Invalid status mode');
                }
                statusMode = mode;
            }

            function animateStatusIndeterminate(ms) {
                var i = Math.floor(ms / INDETERMINATE_STATUS_STEP_MS % 8);
                if (statusIndeterminate.children[i].style.borderTopColor === '') {
                    Array.prototype.slice.call(statusIndeterminate.children).forEach(child => {
                        child.style.borderTopColor = '';
                    });
                    statusIndeterminate.children[i].style.borderTopColor = '#dfdfdf';
                }
            }

            function setStatusNotice(text) {
                while (statusNotice.lastChild) {
                    statusNotice.removeChild(statusNotice.lastChild);
                }
                var lines = text.split('\n');
                lines.forEach((line) => {
                    statusNotice.appendChild(document.createTextNode(line));
                    statusNotice.appendChild(document.createElement('br'));
                });
            };

            function displayFailureNotice(err) {
                var msg = err.message || err;
                console.error(msg);
                setStatusNotice(msg);
                setStatusMode('notice');
                initializing = false;
            };

            if (!window.Engine.isWebGLAvailable()) {
                displayFailureNotice('WebGL not available');
            } else {
                setStatusMode('indeterminate');
                engine.startGame({
                    'onProgress': function (current, total) {
                        if (total > 0) {
                            statusProgressInner.style.width = current / total * 100 + '%';
                            setStatusMode('progress');
                            if (current === total) {
                                // wait for progress bar animation
                                setTimeout(() => {
                                    setStatusMode('indeterminate');
                                }, 500);
                            }
                        } else {
                            setStatusMode('indeterminate');
                        }
                    },
                }).then(() => {
                    setStatusMode('hidden');
                    initializing = false;
                }, displayFailureNotice);
            }
        }
    }, [engine])



    return <div className="game-play">
        <canvas id='canvas'>
            HTML5 canvas appears to be unsupported in the current browser.<br />
            Please try updating or use a different browser.
        </canvas>
        <div id='status'>
            <div id='status-progress' style={{ display: 'none' }} onContextMenu={e => e.preventDefault()}><div id='status-progress-inner'></div></div>
            <div id='status-indeterminate' style={{ display: 'none' }} onContextMenu={e => e.preventDefault()}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div id='status-notice' className='godot' style={{ display: 'none' }}></div>
        </div>
    </div>
}

export default withRouter(GodotPlay)
