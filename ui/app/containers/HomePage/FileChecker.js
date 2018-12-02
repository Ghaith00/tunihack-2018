/* eslint-disable */
import React, { Component } from 'react';
import { Button, Select } from 'antd';
import axios from 'axios';
import keccak256 from 'keccak256';

// Need props (metadata)
class FileChecker extends Component {
  state = {
    file: null,
    loading: false,
    year: '2017',
    cities: [], // props.meta.municipalityData[this.props.metadata.govData[0]],
    secondCity: undefined, // props.meta.municipalityData[this.props.metadata.govData[0]][0],
    error: false,
    fileName: '',
    confirmed: false,
    sended: false,
  };

  // For more informations
  uploadImage(event) {
    // Assuming only image
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      this.setState({
        file: [reader.result][0].split(',')[1],
        fileName: file.name,
      });
    }.bind(this);
  }

  handleGovChange = value => {
    this.setState({
      selected: value,
      cities: this.props.metadata.municipalityData[value],
      secondCity: undefined,
    });
  };

  handleMunChange = value => {
    this.setState({
      secondCity: value,
    });
  };

  handleYearChange = value => {
    this.setState({
      year: value,
    });
  };

  async handleConfirm() {
    try {
      const res = await axios.get('/validation', {
        params: {
          hash: keccak256(this.state.file).toString('hex'),
          municipality: this.state.selected,
        },
      });
      this.setState({ confirmed: res.data.response, sended: true });
    } catch (err) {
      this.setState({ error: true });
    }
  }

  render() {
    return (
      <div>
        <h2>التثبت من مصداقية المعطيات</h2>

        <br />
        <div>
          <Select
            style={{ width: 200 }}
            defaultValue={this.props.metadata.govData[0]}
            onChange={this.handleGovChange}
          >
            {this.props.metadata.govData.map(governorate => (
              <Option key={governorate}>{governorate}</Option>
            ))}
          </Select>{' '}
          الولاية{' '}
        </div>
        <div>
          <Select
            style={{ width: 200 }}
            value={this.state.secondCity}
            onChange={this.handleMunChange}
          >
            {this.state.cities.map(city => (
              <Option key={city}>{city}</Option>
            ))}
          </Select>{' '}
          البلدية{' '}
        </div>

        <br />

        <input
          type="file"
          label="Upload"
          ref={ref => {
            this.fileChangedHandler = ref;
          }}
          style={{ display: 'none' }}
          onChange={this.uploadImage.bind(this)}
        />
        <div>
          <Button onClick={e => this.fileChangedHandler.click()}>
            تحميل الملف
          </Button>{' '}
          {this.state.fileName}
          <Button
            onClick={e => this.handleConfirm(e)}
            loading={this.state.loading}
          >
            التثبت
          </Button>
        </div>

        {this.state.error ? (
          <div style={{ color: 'red' }}>
            {'الملف لا يطابق المعطيات المسجلة'}
          </div>
        ) : (
          ''
        )}
        {this.state.sended ? (
          this.state.confirmed ? (
            <div style={{ color: 'green' }}>{'تم التحقق من الملف'}</div>
          ) : (
            <div style={{ color: 'red' }}>
              {'الملف لا يطابق المعطيات المسجلة'}
            </div>
          )
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default FileChecker;
