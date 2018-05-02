import React from 'react';
import { Form, Icon, Input, Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const locations = [
    {
        "locationid" : 108,
        "locationcode" : "4734",
        "locationname" : "Hyderabad"
    },
    {
        "locationid" : 109,
        "locationcode" : "4727",
        "locationname" : "Lucknow"
    },
    {
        "locationid" : 160,
        "locationcode" : "4721",
        "locationname" : "Vijayawada"
    },
    {
        "locationid" : 162,
        "locationcode" : "4725",
        "locationname" : "Guntur & Vijayawada"
    },
    {
        "locationid" : 164,
        "locationcode" : "DL",
        "locationname" : "Default Location"
    },
    {
        "locationid" : 172,
        "locationcode" : "4742",
        "locationname" : "Rajahmundry"
    },
    {
        "locationid" : 174,
        "locationcode" : "4702",
        "locationname" : "Amritsar"
    },
    {
        "locationid" : 176,
        "locationcode" : "4703",
        "locationname" : "Zirakpur"
    },
    {
        "locationid" : 178,
        "locationcode" : "4706",
        "locationname" : "Jalandhar"
    },
    {
        "locationid" : 180,
        "locationcode" : "4717",
        "locationname" : "Ludhiana"
    },
    {
        "locationid" : 182,
        "locationcode" : "4750",
        "locationname" : "Bhatinda"
    },
    {
        "locationid" : 184,
        "locationcode" : "4719",
        "locationname" : "Jammu"
    },
    {
        "locationid" : 186,
        "locationcode" : "4712",
        "locationname" : "Bhopal Karond"
    },
    {
        "locationid" : 188,
        "locationcode" : "4760",
        "locationname" : "Bhopal Misrod"
    },
    {
        "locationid" : 190,
        "locationcode" : "4716",
        "locationname" : "Raipur"
    },
    {
        "locationid" : 192,
        "locationcode" : "4729",
        "locationname" : "Indore"
    },
    {
        "locationid" : 194,
        "locationcode" : "4723",
        "locationname" : "Agra Chalesar"
    },
    {
        "locationid" : 196,
        "locationcode" : "4713",
        "locationname" : "Kota"
    },
    {
        "locationid" : 198,
        "locationcode" : "4720",
        "locationname" : "Meerut"
    },
    {
        "locationid" : 204,
        "locationcode" : "4724",
        "locationname" : "Aurangabad"
    },
    {
        "locationid" : 206,
        "locationcode" : "4744",
        "locationname" : "Amravati"
    },
    {
        "locationid" : 210,
        "locationcode" : "4797",
        "locationname" : "Agra Sikandra"
    },
    {
        "locationid" : 260,
        "locationcode" : "4812",
        "locationname" : "Lucknow FC"
    },
    {
        "locationid" : 262,
        "locationcode" : "4816",
        "locationname" : "Mumbai FC"
    },
    {
        "locationid" : 276,
        "locationcode" : "4801",
        "locationname" : "Ludhiana, Chandigarh Road"
    },
    {
        "locationid" : 278,
        "locationcode" : "4799",
        "locationname" : "Vizag"
    }
];
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      locations: locations,
    };
  }

  onSearch = (text) => {
      console.log("hello", text);
      const searchedLocations = this.state.locations.filter(location => location.locationname.toLowerCase().indexOf(text.toLowerCase()) > -1);
      console.log(searchedLocations);
      if( text ){
        this.setState({locations: searchedLocations});
      }else {
        this.setState({locations});
      }
  }

  render() {
    console.log("render:",this.state.locations);
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem>
          <Select onSearch={this.onSearch} style={{width: 'auto', minWidth: 200}} placeholder="select location" onChange={this.props.handleLocationChange}>
          {
            this.state.locations.map((item) => {
              return (<Option key={item.locationcode}>{item.locationname}</Option>)
            })
          }
          </Select>
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input className="large-text-field" type="text" placeholder="Enter SKUs e.g 123,211" onChange={this.props.handleSKUChange} />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            loading={this.props.loading}
            onClick={this.props.handleSubmit}
          >
            Check Status
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
export default WrappedHorizontalLoginForm;
