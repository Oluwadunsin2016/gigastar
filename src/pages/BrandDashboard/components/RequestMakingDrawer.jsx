import React, { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from "@heroui/react";
import { Upload, X } from 'lucide-react';

const RequestMakingDrawer = ({ isOpen, onOpenChange }) => {
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [formData, setFormData] = useState({
    creatorRange: '',
    estimatedViewers: '',
    projectedViewers: '',
    projectedConversion: '',
    additionalNotes: ''
  });

  const contentCreatorRanges = [
    "CC with less than 500 followers",
    "CC with less than 1m followers",
    "CC with 1m-2m followers",
    "CC with 2.1m-3m followers",
    "CC with 3.1m-4.1m followers",
    "CC with 5.1m-6.1m followers",
    "CC with 7.1m-8.1m followers",
    "CC with 9.1m-10.1m followers",
    "CC with 11.1m-12.1m followers",
    "CC with 13.1m-14.1m followers",
    "CC with 15.1m-20m followers",
    "CC with 21m-30m followers"
  ];

  const timelineOptions = [
    "Less than 2 weeks",
    "One month",
    "Q1",
    "Q2",
    "Q3",
    "One year"
  ];

  const channels = [
    "YouTube",
    "TikTok",
    "Instagram",
    "Facebook",
    "WhatsApp"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChannelChange = (channel) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const handleTimelineChange = (timeline) => {
    setSelectedTimeline(prev => 
      prev.includes(timeline) 
        ? prev.filter(t => t !== timeline)
        : [...prev, timeline]
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const removeVideoFile = () => {
    setVideoFile(null);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log({
      channels: selectedChannels,
      creatorRange: formData.creatorRange,
      timeline: selectedTimeline,
      estimatedViewers: formData.estimatedViewers,
      projectedViewers: formData.projectedViewers,
      projectedConversion: formData.projectedConversion,
      additionalNotes: formData.additionalNotes,
      videoFile: videoFile
    });
    
    // Close the drawer after submission
    onOpenChange(false);
  };

  return (
    <Drawer size='lg' className='bg-gray-900 text-white' isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1 border-b border-gray-700">
              <h2 className="text-xl font-bold">Create New Campaign Request</h2>
              <p className="text-sm text-gray-400">Fill out the form below to create a new campaign request</p>
            </DrawerHeader>
            <DrawerBody className="overflow-y-auto">
              <div className="space-y-6 py-2">
                {/* Channels Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Channels</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {channels.map((channel) => (
                      <label key={channel} className="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                          checked={selectedChannels.includes(channel)}
                          onChange={() => handleChannelChange(channel)}
                        />
                        <span className="ml-2 text-sm">{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Content Creator Range */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Content Creator Followers Range</h3>
                  <select
                    value={formData.creatorRange}
                    onChange={(e) => handleInputChange('creatorRange', e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select follower range</option>
                    {contentCreatorRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                {/* Timeline Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Timeline</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timelineOptions.map((timeline) => (
                      <label key={timeline} className="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                          checked={selectedTimeline.includes(timeline)}
                          onChange={() => handleTimelineChange(timeline)}
                        />
                        <span className="ml-2 text-sm">{timeline}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Metrics Section */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Estimated Viewers</label>
                    <input
                      type="number"
                      value={formData.estimatedViewers}
                      onChange={(e) => handleInputChange('estimatedViewers', e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Projected Viewers</label>
                    <input
                      type="number"
                      value={formData.projectedViewers}
                      onChange={(e) => handleInputChange('projectedViewers', e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Projected Conversion (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.projectedConversion}
                      onChange={(e) => handleInputChange('projectedConversion', e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0-100%"
                    />
                  </div>
                </div>

                {/* Video Upload Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Upload Product Video (1-2 mins)</h3>
                  {videoFile ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                          <Upload className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{videoFile.name}</p>
                          <p className="text-xs text-gray-400">
                            {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={removeVideoFile}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-750 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">MP4, MOV, AVI (Max 500MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="video/mp4,video/x-m4v,video/*"
                        onChange={handleFileUpload}
                      />
                    </label>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Additional Notes</h3>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    placeholder="Add any additional information about your campaign request..."
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter className="border-t border-gray-700">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Request
              </button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default RequestMakingDrawer;