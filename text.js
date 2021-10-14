import "./Code.css";
import "./sharebtn.css";
import "./customBlocks/custom_Blocks";
import React, { useState, useEffect, useRef } from "react";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import {
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

import { FixedEdgesMetricsManager } from "@blockly/fixed-edges";


export default function Fetchcode() {
  const [xmlcode, setxmlcode] = useState("");
  const [codename, setCodename] = useState("");
  const [checklogin, setchecklogin] = useState(false);
  const [checkcodename, setcheckcodename] = useState(false);
  const [checkcookies, setcookiescheck] = useState(false);
  const [count, setcount] = useState("");
  let countblock = [];
  let beforecode = [];
  let found;
  const textInput = useRef();

  const focusTextInput = () => {
    textInput.current.focus();
  };



  useEffect(() => {
    var xml =
      '<xml><block type="main" x="0" y="0" deletable="false" movable="false" editable="false"></block></xml>';
    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom(xml),
      Blockly.getMainWorkspace()
    );
    Blockly.getMainWorkspace().addChangeListener(Blockly.Events.disableOrphans);

    
    Blockly.getMainWorkspace().addChangeListener(change);
    Blockly.mainWorkspace.options.maxBlocks = 20;

    
    setcount(Blockly.mainWorkspace.getAllBlocks.length);
    document.getElementById('setval').innerText = (Blockly.mainWorkspace.getAllBlocks.length - 2);


  }, []);

  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Logic",
        colour: 210,
        contents: [
          {
            kind: "block",
            blockxml: '<block type="controls_if"></block>',
          },
          {
            kind: "block",
            blockxml: '<block type="logic_compare"></block>',
          },
          {
            kind: "block",
            blockxml: '<block type="logic_operation"></block>',
          },
          {
            kind: "block",
            blockxml: '<block type="logic_negate"></block>',
          },
          {
            kind: "block",
            blockxml: '<block type="logic_boolean"></block>',
          },
          {
            kind: "block",
            type: "logic_null",
          },
          {
            kind: "block",
            type: "logic_ternary",
          },
        ],
      },
      {
        kind: "category",
        name: "Loops",
        colour: 120,
        contents: [
          {
            kind: "block",
            blockxml:
              '<block type="controls_repeat_ext">\n' +
              '<value name="TIMES">\n' +
              '<shadow type="math_number">\n' +
              '<field name="NUM">10</field>\n' +
              "</shadow>\n" +
              "</value>\n" +
              "</block>",
          },
          // {
          //   kind :"block",
          //   blockxml:'<block type="wait_seconds"></block>'
          // },
          {
            kind: "block",
            blockxml:
              '    <block type="controls_whileUntil">\n' +
              '      <field name="MODE">WHILE</field>\n' +
              "    </block>",
          },
          {
            kind: "block",
            blockxml:
              '<block type="controls_for">\n' +
              '<value name="FROM">\n' +
              '<shadow type="math_number">\n' +
              '<field name="NUM">1</field>\n' +
              "</shadow>\n" +
              "</value>\n" +
              '<value name="TO">\n' +
              '<shadow type="math_number">\n' +
              '<field name="NUM">10</field>\n' +
              "</shadow>\n" +
              "</value>\n" +
              '<value name="BY">\n' +
              '<shadow type="math_number">\n' +
              '<field name="NUM">1</field>\n' +
              "</shadow>\n" +
              "</value>\n" +
              "</block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="controls_forEach">\n' +
              '      <field name="VAR" id="Cg!CSk/ZJo2XQN3=VVrz" variabletype="">j</field>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="controls_flow_statements">\n' +
              '      <field name="FLOW">BREAK</field>\n' +
              "    </block>\n",
          },
        ],
      },
      {
        kind: "category",
        name: "Math",
        colour: 230,
        contents: [
          {
            kind: "block",
            blockxml:
              '    <block type="math_round">\n' +
              '      <field name="OP">ROUND</field>\n' +
              '      <value name="NUM">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">3.1</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_number">\n' +
              '      <field name="NUM">0</field>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_single">\n' +
              '      <field name="OP">ROOT</field>\n' +
              '      <value name="NUM">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">9</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml: '<block type="character_to_number"></block>',
          },
          {
            kind: "block",
            blockxml: '<block type="number_to_character"></block>',
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_trig">\n' +
              '      <field name="OP">SIN</field>\n' +
              '      <value name="NUM">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">45</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_constant">\n' +
              '      <field name="CONSTANT">PI</field>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_number_property">\n' +
              '      <mutation divisor_input="false"></mutation>\n' +
              '      <field name="PROPERTY">EVEN</field>\n' +
              '      <value name="NUMBER_TO_CHECK">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">0</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_arithmetic">\n' +
              '      <field name="OP">ADD</field>\n' +
              '      <value name="A">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">1</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="B">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">1</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_on_list">\n' +
              '      <mutation op="SUM"></mutation>\n' +
              '      <field name="OP">SUM</field>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_modulo">\n' +
              '      <value name="DIVIDEND">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">64</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="DIVISOR">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">10</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_constrain">\n' +
              '      <value name="VALUE">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">50</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="LOW">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">1</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="HIGH">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">100</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_random_int">\n' +
              '      <value name="FROM">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">1</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="TO">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">100</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            type: "math_random_float",
          },
        ],
      },
      {
        kind: "category",
        name: "Text",
        colour: 160,
        "custom": "TEXT",
        contents: [
          {
            kind: "block",
            blockxml: '<block type="print"><value name="NAME"><shadow  type="text"><field name="TEXT"></field></shadow></value></block>',
            hidden: 'true',

          },
          {
            kind: "block",
            blockxml:
              '    <block type="text">\n' +
              '      <field name="TEXT"></field>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml: '<block type="newline"></block>',
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_prompt_ext">\n' +
              '      <mutation type="TEXT"></mutation>\n' +
              '      <field name="TYPE">TEXT</field>\n' +
              '      <value name="TEXT">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">abc</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_charAt">\n' +
              '      <mutation at="true"></mutation>\n' +
              '      <field name="WHERE">FROM_START</field>\n' +
              '      <value name="VALUE">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_append">\n' +
              '      <field name="VAR" id=":};P,s[*|I8+L^-.EbRi" variabletype="">item</field>\n' +
              '      <value name="TEXT">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT"></field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_length">\n' +
              '      <value name="VALUE">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">abc</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_isEmpty">\n' +
              '      <value name="VALUE">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT"></field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_indexOf">\n' +
              '      <field name="END">FIRST</field>\n' +
              '      <value name="VALUE">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              '      <value name="FIND">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">abc</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_join">\n' +
              '      <mutation items="2"></mutation>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_getSubstring">\n' +
              '      <mutation at1="true" at2="true"></mutation>\n' +
              '      <field name="WHERE1">FROM_START</field>\n' +
              '      <field name="WHERE2">FROM_START</field>\n' +
              '      <value name="STRING">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_changeCase">\n' +
              '      <field name="CASE">UPPERCASE</field>\n' +
              '      <value name="TEXT">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">abc</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_trim">\n' +
              '      <field name="MODE">BOTH</field>\n' +
              '      <value name="TEXT">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">abc</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          // {
          //   kind: "block",
          //   blockxml:
          //     '    <block type="text_print">\n' +
          //     '      <value name="TEXT">\n' +
          //     '        <shadow type="text">\n' +
          //     '          <field name="TEXT">abc</field>\n' +
          //     "        </shadow>\n" +
          //     "      </value>\n" +
          //     "    </block>\n",
          // },
        ],
      },
      {
        kind: "category",
        name: "Lists",
        colour: 259,
        contents: [
          {
            kind: "block",
            blockxml:
              '    <block type="lists_indexOf">\n' +
              '      <field name="END">FIRST</field>\n' +
              '      <value name="VALUE">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_create_with">\n' +
              '      <mutation items="0"></mutation>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_repeat">\n' +
              '      <value name="NUM">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">5</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            type: "lists_length",
          },
          {
            kind: "block",
            type: "lists_isEmpty",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_create_with">\n' +
              '      <mutation items="3"></mutation>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_getIndex">\n' +
              '      <mutation statement="false" at="true"></mutation>\n' +
              '      <field name="MODE">GET</field>\n' +
              '      <field name="WHERE">FROM_START</field>\n' +
              '      <value name="VALUE">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_setIndex">\n' +
              '      <mutation at="true"></mutation>\n' +
              '      <field name="MODE">SET</field>\n' +
              '      <field name="WHERE">FROM_START</field>\n' +
              '      <value name="LIST">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_getSublist">\n' +
              '      <mutation at1="true" at2="true"></mutation>\n' +
              '      <field name="WHERE1">FROM_START</field>\n' +
              '      <field name="WHERE2">FROM_START</field>\n' +
              '      <value name="LIST">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_split">\n' +
              '      <mutation mode="SPLIT"></mutation>\n' +
              '      <field name="MODE">SPLIT</field>\n' +
              '      <value name="DELIM">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">,</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_sort">\n' +
              '      <field name="TYPE">NUMERIC</field>\n' +
              '      <field name="DIRECTION">1</field>\n' +
              "    </block>\n",
          },
        ],
      },
      {
        kind: "category",
        name: "Style",
        colour: 19,
        contents: [
          {
            kind: "block",
            blockxml: '<block type="bgcolor"></block>',
          },
          {
            kind: "block",
            blockxml: '<block type="textcolor"></block>',
          },
          {
            kind: "block",
            blockxml: ' <block type="bg_image"></block>',
          },
          {
            kind: "block",
            blockxml: '<block type="font"></block>',
          },
          {
            kind: "block",
            blockxml:
              '    <block type="colour_picker">\n' +
              '      <field name="COLOUR">#ff0000</field>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            type: "colour_random",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="colour_rgb">\n' +
              '      <value name="RED">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">100</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="GREEN">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">50</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="BLUE">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">0</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="colour_blend">\n' +
              '      <value name="COLOUR1">\n' +
              '        <shadow type="colour_picker">\n' +
              '          <field name="COLOUR">#ff0000</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="COLOUR2">\n' +
              '        <shadow type="colour_picker">\n' +
              '          <field name="COLOUR">#3333ff</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="RATIO">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">0.5</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
        ],
      },
      { kind: "sep" },
      {
        kind: "category",
        name: "Variables",
        custom: "VARIABLE",
        colour: 330,
      },
      {
        kind: "category",
        name: "Functions",
        custom: "PROCEDURE",
        colour: 290,
      },
    ],
  };


  
  const runcode = () => {
    document.getElementById("circle").innerHTML = "";
    document.getElementById("circle").style.backgroundColor = "";
    document.getElementById("circle").style.backgroundImage = "";
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = xmlcode;
    try {
      eval(code);
      //console.log("Run 1");
      checkvalid();
      console.log("goti:" + count);
    } catch (e) {
      alert(e);
    }
  };

  function getMainDescendants() {
    const mainBlock = Blockly.Workspace.getBlocksByType('main')[0];
    if (mainBlock) {
      return mainBlock.getDescendants();
    } else {
      return [];
    }
  }

  function updateMainDescendants() {
    const mainBlockDescendants = getMainDescendants();
    if (!mainBlockDescendants.some(block => block.isInsertionMarker())) {
      // block is not being added/removed as descendant to/from main so update the number
      numOfDescendants = mainBlockDescendants.length;
    }
  }


  const callkagoti = (e) => {
    console.log(e);
    let currentNumOfDescendants = numOfDescendants;
    updateMainDescendants();
    if (currentNumOfDescendants !== numOfDescendants) { // display if change
      console.log("ffff:" + numOfDescendants);
    }
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setCodename(e.target.value);
  };

  FixedEdgesMetricsManager.setFixedEdges({
    top: true,
    left: true,
  });
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12} sm={12} md={6}>
          <BlocklyWorkspace
            toolboxConfiguration={toolboxCategories}
            workspaceConfiguration={{
              trashcan: false,
              plugins: {
                metricsManager: FixedEdgesMetricsManager,
              },
              move: {
                scrollbars: true,
                drag: false,
                wheel: false,
              },
            }}
            scrollbars="true"
            className="fill-height"
            onWorkspaceChange={workspaceDidChange}
            addChangeListener={callkagoti}
          />
        </Grid>

        <Grid item lg={6} xs={12} sm={12} md={6}>
          <div className="pre_tag_block" id="output">
            <button className="codebtn space_run_btn" onClick={runcode}>
              <img src={runbtn} alt="run button"></img>
            </button>
            <button
              onClick={function () {
                document.getElementById("circle").innerHTML = "";
                document.getElementById("circle").style.backgroundColor = "";
                document.getElementById("circle").style.backgroundImage = "";
              }}
              className="codebtn"
            >
              <img src={clearbtn} alt="clear button"></img>
            </button>
            <button className="codebtn" onClick={callmeout}>
              <img src={sharebtn} alt="share button"></img>
            </button>
            <button className="login_redirect" onClick={redirectLogin}>
              {checklogin === true ? "Login to save this code." : ""}
            </button>
            <lable id="setval"></lable>
            {checkcookies && checkcodename ? (
              <span className="editcodename">
                <TextField
                  value={codename}
                  // label="Code name"
                  onKeyDown={keyPress}
                  name="codename"
                  onChange={handleChange}
                  id="codename"
                  size="small"
                  className="inputfield"
                  InputProps={{ disableUnderline: true }}
                  inputRef={textInput}
                />

                <EditIcon className="editicon" onClick={focusTextInput} />
              </span>
            ) : (
              ""
            )}

            <pre
              id="circle"
              className="output_area"
              style={{ overflow: "scroll" }}
            ></pre>
          </div>
        </Grid>

          
      </Grid>
    </>
  );
}
