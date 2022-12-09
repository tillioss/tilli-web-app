import React from "react";
import AudioQuizScreen from './AudioQuizScreen';
import DropToSelection from './DropToSelection';
import MeetSinglePerson from './MeetSinglePerson';


export default class StoryCardScreen extends React.Component{


    constructor(props)
    {
        super(props)
        this.state={
            checkindex:0
        }
        this.changeindex = this.changeindex.bind(this)
    }

    changeindex(Type ,index)
    {
         console.log(Type)
         console.log(index)
         if( Type=="Next")
         {
            this.setState({checkindex:index+1})
         }
         else if(Type=="Previous")
         {
            this.setState({checkindex:index-1})
         }
        
    }
    render()
    {
        const {data,stage,key} =this.props;
        const {checkindex}= this.state

        let arraypush=[];
        Object.keys(data.content).map((ival,index) => {

            
          
            if(data.content[index].theme == "MeetSinglePerson"  && index == checkindex  )
            {
                    arraypush.push(<MeetSinglePerson
                        {...this.props}
                       // changeStage={this.changeStage}
                        stage={index}
                       // key={stageIndex}
                        data={data.content[index]}
                        themeType={data.theme}
                        changeindex={this.changeindex}
                        parentindex={this.props.stage}
                    />)

                   
                
               
            }

            if(data.content[index].theme == "AudioQuizScreen"  && index == checkindex  )
            {
                
                    arraypush.push(
                         <AudioQuizScreen  
                         {...this.props}
                         // changeStage={this.changeStage}
                          stage={index}
                         // key={stageIndex}
                          data={data.content[index]}
                          themeType={data.theme}
                          changeindex={this.changeindex}
                         />)

               
            }

            if(data.content[index].theme == "DropToSelection"  && index == checkindex  )
            {
           
                    arraypush.push(
                         <DropToSelection  
                         {...this.props}
                         // changeStage={this.changeStage}
                          stage={index}
                         // key={stageIndex}
                          data={data.content[index]}
                          themeType={data.theme}
                          changeindex={this.changeindex}
                          parentindex={this.props.stage}
                         />)
                
               
            }
            
        });
     

        return(<React.Fragment>
            {/* {JSON.stringify(data.content)} */}
            {arraypush}
            </React.Fragment>)
    }

}